import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import HandymanIcon from '@mui/icons-material/Handyman';
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
    <Box
      sx={{
        bgcolor: 'grey.900',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: 400, width: '100%' }}
      >
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Card elevation={8}>
            <CardContent sx={{ p: 5 }}>
              <motion.div variants={itemVariants}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <HandymanIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
                    TupiaManager
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Painel de Administração
                  </Typography>
                </Box>
              </motion.div>

              {apiError && (
                <motion.div variants={itemVariants}>
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {apiError}
                  </Alert>
                </motion.div>
              )}

              <motion.form onSubmit={handleSubmit} variants={itemVariants}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  disabled={loading}
                  error={!!errors.email}
                  helperText={errors.email?.[0]}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="password"
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  error={!!errors.password}
                  helperText={errors.password?.[0]}
                  sx={{ mb: 3 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                >
                  {loading ? 'Autenticando...' : 'Entrar'}
                </Button>
              </motion.form>

              <motion.div variants={itemVariants}>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
                  Desenvolvido com ❤️ para TupiaManager
                </Typography>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Box>
  );
}
