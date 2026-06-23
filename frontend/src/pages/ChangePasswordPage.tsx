import { useState } from 'react';
import { z } from 'zod';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import SecurityIcon from '@mui/icons-material/Security';
import { changePassword } from '../services/auth.service';
import { ErrorDisplay } from '../components/shared/ErrorDisplay';

const passwordRules = z
  .string()
  .min(8, 'A senha deve conter no mínimo 8 caracteres')
  .max(32, 'A senha deve conter no máximo 32 caracteres')
  .refine((p) => /[A-Z]/.test(p), 'A senha deve conter pelo menos uma letra maiúscula')
  .refine((p) => /[a-z]/.test(p), 'A senha deve conter pelo menos uma letra minúscula')
  .refine((p) => /[0-9]/.test(p), 'A senha deve conter pelo menos um número')
  .refine((p) => /[!@#$%^&*(),.?":{}|<>]/.test(p), 'A senha deve conter pelo menos um caractere especial');

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'A senha atual é obrigatória'),
    newPassword: passwordRules,
    confirmPassword: z.string().min(1, 'A confirmação é obrigatória'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'A confirmação não corresponde à nova senha',
    path: ['confirmPassword'],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: 'A nova senha não pode ser igual à senha atual',
    path: ['newPassword'],
  });

export function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError('');
    setSuccess(false);

    const result = changePasswordSchema.safeParse({ currentPassword, newPassword, confirmPassword });
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await changePassword(currentPassword, newPassword, confirmPassword);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const error = err as Error & { status?: number; fieldErrors?: Record<string, string[]> };
      if (error.status === 429) {
        setApiError('Muitas tentativas. Aguarde e tente novamente.');
      } else if (error.fieldErrors) {
        setErrors(error.fieldErrors);
      } else {
        setApiError(error.message || 'Erro ao alterar a senha');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 560 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <SecurityIcon color="primary" />
            <Typography variant="h6">Trocar senha</Typography>
          </Box>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Senha alterada com sucesso!
            </Alert>
          )}
          {apiError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {apiError}
            </Alert>
          )}
          <ErrorDisplay errors={errors} />

          <Stack component="form" onSubmit={handleSubmit} spacing={2.5}>
            <TextField
              id="currentPassword"
              label="Senha atual"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />

            <TextField
              id="newPassword"
              label="Nova senha"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              helperText="Mín. 8 caracteres, com maiúscula, minúscula, número e caractere especial."
            />

            <TextField
              id="confirmPassword"
              label="Confirmar nova senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
            >
              {loading ? 'Salvando...' : 'Alterar senha'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
