import { useState } from 'react';
import { z } from 'zod';
import { BsShieldLock, BsCheckCircleFill } from 'react-icons/bs';
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
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex align-items-center gap-2 mb-4">
              <BsShieldLock size={22} className="text-primary" />
              <h5 className="card-title mb-0">Trocar senha</h5>
            </div>

            {success && (
              <div className="alert alert-success d-flex align-items-center gap-2 py-2" role="alert">
                <BsCheckCircleFill /> Senha alterada com sucesso!
              </div>
            )}
            {apiError && (
              <div className="alert alert-danger py-2" role="alert">
                {apiError}
              </div>
            )}
            <ErrorDisplay errors={errors} />

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">
                  Senha atual
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-control"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  Nova senha
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <div className="form-text">
                  Mín. 8 caracteres, com maiúscula, minúscula, número e caractere especial.
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar nova senha
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-100">
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Salvando...
                  </>
                ) : (
                  'Alterar senha'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
