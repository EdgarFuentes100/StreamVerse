import { useState, useEffect } from 'react';

const SubModal = ({
  show,
  handleClose,
  handleContinue, 
  children,
  titulo,
  width = "90%",
  continueText = "Continuar",
  cancelText = "Cerrar",
  showCloseButton = true,
  backdrop = true,
  scrollable = false
}) => {
  const [verticalOffset, setVerticalOffset] = useState(0);
  const topbarHeight = 60;

  useEffect(() => {
    const calculateOffset = () => {
      const offset = window.innerWidth < 992 ? topbarHeight + 20 : 0;
      setVerticalOffset(offset);
    };

    calculateOffset();
    window.addEventListener('resize', calculateOffset);

    return () => {
      window.removeEventListener('resize', calculateOffset);
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && backdrop) {
      handleClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${show ? "flex" : "hidden"} items-start justify-center ${
        backdrop ? "bg-black/50" : "bg-transparent"
      } transition-opacity duration-300 overflow-y-auto`}
      tabIndex="-1"
      role="dialog"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative my-8 ${scrollable ? "max-h-[calc(100vh-4rem)] overflow-y-auto" : ""}`}
        style={{
          width: width,
          maxWidth: "calc(100vw - 2rem)",
          marginTop: `${verticalOffset}px`,
        }}
        role="document"
      >
        <div className="bg-white rounded-lg shadow-xl transform transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{titulo}</h2>
            {showCloseButton && (
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                onClick={handleClose}
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-4">{children}</div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 !bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              onClick={handleClose}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white !bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              onClick={handleContinue}
            >
              {continueText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubModal;