import { useState, useEffect, useRef } from "react";
import React from "react";

const TablaReutilizable = ({
    data = [],
    columnas = [],
    expandible = [],
    acciones = [],
    idKey = "id",
    searchPlaceholder = "Buscar..."
}) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [hiddenCols, setHiddenCols] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const tableRef = useRef(null);
    const toggleRow = (id) => setExpandedRow(prev => prev === id ? null : id);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const hidden = columnas
            .filter((col, index) => {
                if (!col.hideOnMobile) return false;
                if (windowWidth <= 768) return true;
                if (windowWidth <= 800 && index >= columnas.length - 6) return true;
                if (windowWidth <= 1000 && index >= columnas.length - 4) return true;
                if (windowWidth <= 1200 && index >= columnas.length - 2) return true;
                return false;
            })
            .map(col => col.label);

        setHiddenCols(hidden);
    }, [windowWidth, columnas]);

    const filteredData = (data || []).filter(item =>
        columnas.some(col => {
            const val = item[col.key];
            return val !== undefined && val?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage, searchTerm]);

    const renderValue = (col, value) => {
        if (col.isBoolean) return value === 1 || value === true ? "Sí" : "No";
        return value ?? "-";
    };

    return (
        <div className="bg-gray-800 shadow-2xl rounded-xl border border-gray-600 overflow-hidden">

            {/* Header - MANTENIDO */}
            <div className="bg-gray-600 px-4 py-3 border-b border-gray-500 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">

                {/* Selector de filas */}
                <div className="flex items-center justify-between sm:justify-start gap-2">
                    <span className="text-gray-100 text-sm whitespace-nowrap">Mostrar</span>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                        className="border border-gray-400 bg-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent min-w-[80px] hover:bg-gray-500 transition-colors"
                    >
                        <option value={10} className="bg-gray-600">10</option>
                        <option value={25} className="bg-gray-600">25</option>
                        <option value={50} className="bg-gray-600">50</option>
                        <option value={100} className="bg-gray-600">100</option>
                    </select>
                </div>

                {/* Búsqueda */}
                <div className="flex-1 min-w-0">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="w-full border border-gray-400 bg-gray-600 text-white rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-200 hover:bg-gray-500 transition-colors"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Tabla - SOLO FILAS MÁS CLARAS */}
            <div className="bg-gray-800 p-0">
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="w-full" ref={tableRef}>
                        <thead className="bg-gray-700 sticky top-0">
                            <tr>
                                {columnas.map(col => (
                                    <th
                                        key={col.key}
                                        className={`px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-500 ${hiddenCols.includes(col.label) ? 'hidden' : ''}`}
                                    >
                                        {col.label}
                                    </th>
                                ))}
                                {acciones.length > 0 && (
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-500">
                                        Acciones
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-600">
                            {paginatedData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columnas.length + (acciones.length > 0 ? 1 : 0)}
                                        className="text-center py-8 text-gray-200 bg-gray-800"
                                    >
                                        <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <p className="text-gray-200">
                                            {searchTerm ? "No se encontraron resultados" : "No hay registros"}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map(item => {
                                    const rowId = item[idKey];
                                    const isExpanded = expandedRow === rowId;
                                    return (
                                        <React.Fragment key={rowId}>
                                            {/* FILA PRINCIPAL - MÁS CLARA */}
                                            <tr
                                                onClick={() => expandible.length > 0 && hiddenCols.length > 0 && toggleRow(rowId)}
                                                className={`bg-gray-700 hover:bg-gray-600 transition-colors duration-150 ${expandible.length > 0 && hiddenCols.length > 0 ? 'cursor-pointer' : ''}`}
                                            >
                                                {columnas.map(col => (
                                                    <td
                                                        key={col.key}
                                                        className={`px-4 py-4 text-sm text-gray-100 ${hiddenCols.includes(col.label) ? 'hidden' : ''}`}
                                                    >
                                                        {renderValue(col, item[col.key])}
                                                    </td>
                                                ))}

                                                {acciones.length > 0 && (
                                                    <td className="px-4 py-4 text-center">
                                                        <div className="flex justify-center space-x-2">
                                                            {acciones.map((action, i) => (
                                                                <button
                                                                    key={i}
                                                                    className={`p-2 rounded-lg border transition-all duration-200 font-medium ${action.variant === 'danger'
                                                                            ? 'border-red-500 text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 hover:shadow-lg hover:shadow-red-500/25'
                                                                            : action.variant === 'success'
                                                                                ? 'border-green-500 text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 hover:shadow-lg hover:shadow-green-500/25'
                                                                                : action.variant === 'warning'
                                                                                    ? 'border-amber-500 text-white bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-500/25'
                                                                                    : 'border-blue-500 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/25'
                                                                        }`}
                                                                    title={action.label}
                                                                    onClick={(e) => { e.stopPropagation(); action.onClick(item); }}
                                                                >
                                                                    <span className="text-xs">{action.label}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                            {isExpanded && hiddenCols.length > 0 && (
                                                <tr className="bg-gray-600">
                                                    <td colSpan={columnas.length + (acciones.length > 0 ? 1 : 0)} className="px-4 py-4">
                                                        {/* Encabezado de detalles */}
                                                        <div className="flex justify-between items-center mb-3 flex-wrap">
                                                            <h6 className="text-blue-200 font-semibold text-sm">Detalles</h6>
                                                            <small className="text-gray-200 text-sm">ID: {rowId}</small>
                                                        </div>

                                                        {/* Contenido de detalles */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            {expandible.map(exp => {
                                                                const colOriginal = columnas.find(c => c.key === exp.key);
                                                                if (!colOriginal) return null;
                                                                if (!hiddenCols.includes(exp.label)) return null;

                                                                return (
                                                                    <div key={exp.key} className="bg-gray-500 rounded-lg p-3 border border-gray-400">
                                                                        <span className="font-semibold text-gray-100 text-sm">{exp.label}:</span>{" "}
                                                                        <span className="text-gray-200 text-sm">{renderValue(colOriginal, item[exp.key])}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 border-t border-gray-600 gap-3 bg-gray-700">
                    <span className="text-gray-100 text-sm text-center sm:text-left">
                        Página {currentPage} de {totalPages}
                    </span>
                    <div className="flex space-x-2">
                        <button
                            className="px-4 py-2 border border-gray-400 text-white bg-gray-600 rounded-lg hover:bg-gray-500 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm whitespace-nowrap font-medium"
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-4 py-2 border border-gray-400 text-white bg-gray-600 rounded-lg hover:bg-gray-500 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm whitespace-nowrap font-medium"
                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TablaReutilizable;