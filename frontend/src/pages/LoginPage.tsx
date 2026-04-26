import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { BsHammer } from 'react-icons/bs';
import { login } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [apiError, setApiError] = useState<string>('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError('');

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const formatted = result.error.flatten();
      setErrors(formatted.fieldErrors);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setLoading(true);
    try {
      const { token } = await login(email, password);
      loginContext(token);
      navigate('/admin/materials', { replace: true });
    } catch (err) {
      const error = err as any;
      if (error.status === 429) {
        setApiError('Muitas tentativas. Aguarde e tente novamente.');
      } else if (error.fieldErrors) {
        setErrors(error.fieldErrors);
      } else {
        setApiError(error.message || 'Erro ao fazer login');
      }
      setShake(true);
      setTimeout(() => setShake(false), 400);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark vh-100 d-flex align-items-center justify-content-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="card shadow-lg"
        >
          <div className="card-body p-5">
            <motion.div variants={itemVariants} className="text-center mb-4">
              <BsHammer size={40} className="text-primary mb-2" style={{ margin: '0 auto', display: 'block' }} />
              <h1 className="card-title h4 fw-bold mb-1">NexusAdmin</h1>
              <p className="text-muted small">Painel de Administração</p>
            </motion.div>

            {apiError && (
              <motion.div variants={itemVariants} className="alert alert-danger alert-dismissible fade show" role="alert">
                {apiError}
              </motion.div>
            )}

            <motion.form onSubmit={handleSubmit} variants={itemVariants}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="seu@email.com"
                  disabled={loading}
                />
                {errors.email && <div className="invalid-feedback d-block">{errors.email[0]}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  disabled={loading}
                />
                {errors.password && <div className="invalid-feedback d-block">{errors.password[0]}</div>}
              </div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary w-100 btn-lg"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Autenticando...
                  </>
                ) : (
                  'Entrar'
                )}
              </motion.button>
            </motion.form>

            <motion.p variants={itemVariants} className="text-center text-muted small mt-4">
              Desenvolvido com ❤️ para NexusAdmin
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
