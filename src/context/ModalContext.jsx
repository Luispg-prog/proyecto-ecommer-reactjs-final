import React, { createContext, useContext, useState, useEffect } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
    const [modal, setModal] = useState({ 
        open: false, 
        title: '', 
        message: '', 
        onConfirm: null, 
        type: 'info',
        autoClose: true,
        duration: 3000
    });

    const showModal = ({ title = '', message = '', onConfirm = null, type = 'info', autoClose = true, duration = 3000 }) => {
        setModal({ open: true, title, message, onConfirm, type, autoClose, duration });
    };

    const hideModal = () => setModal({ 
        open: false, 
        title: '', 
        message: '', 
        onConfirm: null, 
        type: 'info',
        autoClose: true,
        duration: 3000
    });

    const handleConfirm = () => {
        if (typeof modal.onConfirm === 'function') {
            try {
                modal.onConfirm();
            } catch (e) {
                // ignore
            }
        }
        hideModal();
    };

    // Auto-cierre después del tiempo especificado
    useEffect(() => {
        if (modal.open && modal.autoClose && modal.duration > 0) {
            const timer = setTimeout(() => {
                hideModal();
            }, modal.duration);
            return () => clearTimeout(timer);
        }
    }, [modal.open, modal.autoClose, modal.duration]);

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}

            {modal.open && (
                <div className="modal-overlay" style={overlayStyle}>
                    <div className="modal-dialog" style={dialogStyle} role="dialog" aria-modal="true">
                        <div style={{ marginBottom: 8, fontWeight: 700 }}>{modal.title}</div>
                        <div style={{ marginBottom: 16 }}>{modal.message}</div>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error('useModal debe usarse dentro de ModalProvider');
    return ctx;
}

// estilos en línea mínimos (puedes mover a CSS si prefieres)
const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
};

const dialogStyle = {
    background: '#fff',
    padding: '16px 18px',
    borderRadius: 8,
    maxWidth: 520,
    width: 'min(92%, 520px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
};

export default ModalContext;
