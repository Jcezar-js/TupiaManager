import { useParams } from 'react-router-dom';
import { MaterialList } from '../components/materials/MaterialList';
import { MaterialForm } from '../components/materials/MaterialForm';

export function MaterialsPage() {
  const { id } = useParams();
  const isNew = window.location.pathname.includes('/new');

  if (isNew || id) {
    return <MaterialForm />;
  }

  return <MaterialList />;
}
