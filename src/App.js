import React, { useState, useEffect } from 'react';
import './App.css';

// --- Funciones de Validación ---
const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validarNombre = (nombre) => {
  if (!nombre) return 'Tu nombre de recluta es requerido.';
  if (nombre.length < 2) return 'El nombre debe tener al menos 2 caracteres.';
  return null;
};

const validarCorreo = (correo) => {
  if (!correo) return 'El correo es obligatorio.';
  if (!validarEmail(correo)) return 'Ingresa un correo válido.';
  return null;
};

const validarContrasena = (contrasena) => {
  if (!contrasena) return 'La contraseña es obligatoria.';
  if (contrasena.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
  return null;
};

function App() {
  const [formData, setFormData] = useState({ nombre: '', correo: '', contrasena: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    let error = null;
    if (name === 'nombre') error = validarNombre(value);
    if (name === 'correo') error = validarCorreo(value);
    if (name === 'contrasena') error = validarContrasena(value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {
      nombre: validarNombre(formData.nombre),
      correo: validarCorreo(formData.correo),
      contrasena: validarContrasena(formData.contrasena)
    };
    const validErrors = Object.fromEntries(Object.entries(formErrors).filter(([_, value]) => value !== null));
    setErrors(validErrors);
    setTouched({ nombre: true, correo: true, contrasena: true });

    if (Object.keys(validErrors).length === 0) {
      console.log('Registro exitoso:', formData);
      setSubmitStatus('success');
      setTimeout(() => {
        handleReset();
      }, 3000);
    }
  };

  const handleReset = () => {
    setFormData({ nombre: '', correo: '', contrasena: '' });
    setErrors({});
    setTouched({});
    setSubmitStatus('idle');
  };
  
  return (
    <div className={`form-container ${isLoaded ? 'loaded' : ''}`}>
      <h1 className="form-title">🟢 Portal de Reclutamiento 🟢</h1>
      
      {submitStatus === 'success' && (
        <div className="success-message" style={{ display: 'block' }}>
          ✨ ¡Voluntad aceptada! Bienvenido a los Corps. ✨
        </div>
      )}

      <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
        {/* Campo Nombre */}
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">👤 Nombre de Recluta</label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre" 
            className={`form-input ${touched.nombre && errors.nombre ? 'error' : ''}`}
            placeholder="Ej: Hal Jordan"
            value={formData.nombre}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {touched.nombre && errors.nombre && <div className="error-message show">{errors.nombre}</div>}
        </div>

        {/* Campo Correo */}
        <div className="form-group">
          <label htmlFor="correo" className="form-label">📧 Holocomunicador (Email)</label>
          <input 
            type="email" 
            id="correo" 
            name="correo" 
            className={`form-input ${touched.correo && errors.correo ? 'error' : ''}`}
            placeholder="recluta@greenlantern.com"
            value={formData.correo}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {touched.correo && errors.correo && <div className="error-message show">{errors.correo}</div>}
        </div>

        {/* Campo Contraseña */}
        <div className="form-group">
          <label htmlFor="contrasena" className="form-label">🔒 Juramento Secreto (Contraseña)</label>
          <input 
            type="password" 
            id="contrasena" 
            name="contrasena" 
            className={`form-input ${touched.contrasena && errors.contrasena ? 'error' : ''}`}
            placeholder="Mínimo 8 caracteres de pura voluntad"
            value={formData.contrasena}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {touched.contrasena && errors.contrasena && <div className="error-message show">{errors.contrasena}</div>}
        </div>

        <button type="submit" className="submit-btn">
          {submitStatus === 'success' ? '✅ ¡Aceptado!' : 'Unirse a los Corps'}
        </button>
        <button type="reset" className="reset-btn">Limpiar Datos</button>
      </form>
    </div>
  );
}

export default App;