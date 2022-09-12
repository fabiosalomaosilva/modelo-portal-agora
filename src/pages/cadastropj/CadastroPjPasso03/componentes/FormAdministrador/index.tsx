import Button from '../../../../../components/forms/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Administrador } from '../../../../../models/conta';
import { addAdministrador } from '../../../../../store/rootSlice';
import Input from '../../../../../components/forms/Input/input';
import MaskInput from '../../../../../components/forms/Input/inputTextMask';
import Select from '../../../../../components/forms/Select';
import Separator from '../../../../../components/forms/Separator';

export interface FormAdministradorProps {
  visible: boolean;
}

export default function FormAdministrador(props: FormAdministradorProps) {
  const dispatch = useDispatch();
  let textClass = 'block';
  if (props.visible) {
    textClass = 'block';
  } else {
    textClass = 'hidden';
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O campo Nome é obrigatório'),
    cpf: Yup.string().required('O campo CPF é obrigatório'),
    rg: Yup.string().required('O campo RG é obrigatório'),
    orgaoEmissor: Yup.string().required('O campo Órgão Emissor é obrigatório'),
  });

  const initialValues: Administrador = {
    id: '',
    nome: '',
    cpf: '',
    rg: '',
    orgaoEmissor: '',
  };

  const onSubmit = (values: Administrador) => {
      dispatch(addAdministrador(values));
      formik.resetForm();
  };

  const handleCancel = () => {
    formik.resetForm();
    //dispatch(setHidePanelPessoaProprietaria());
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className={`flex flex-col ${textClass} mt-3`}>
      <form onSubmit={formik.handleSubmit}>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 sm:gap-2'>
            <Input
              type='text'
              placeholder='Nome'
              label='Nome'
              id='nome'
              name='nome'
              value={formik.values.nome}
              error={formik.errors.nome}
              touched={formik.touched.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

          <MaskInput
            type='text'
            mask='999.999.999-99'
            placeholder='CPF'
            label='CPF'
            id='cpf'
            name='cpf'
            value={formik.values.cpf}
            error={formik.errors.cpf}
            touched={formik.touched.cpf}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Input
            type='number'
            className='textfield'
            placeholder='RG'
            label='RG'
            id='rg'
            name='rg'
            value={formik.values.rg}
            error={formik.errors.rg}
            touched={formik.touched.rg}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Select
            label='Orgão Emissor'
            id='orgaoEmissor'
            name='orgaoEmissor'
            value={formik.values.orgaoEmissor}
            error={formik.errors.orgaoEmissor}
            touched={formik.touched.orgaoEmissor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value='SSP'>SSP</option>
            <option value='MEX'>MEX</option>
            <option value='CREA'>CREA</option>
            <option value='OAB'>OAB</option>
            <option value='CORECON'>CORECON</option>
            <option value='CRM'>CRM</option>
          </Select>
        </div>
        <Separator />
        <div className='text-right mt-5'>
          <Button
            type='button'
            size='sm'
            color='secondary'
            className='mx-2'
            onClick={() => handleCancel()}
          >
            Cancelar
          </Button>
          <Button type='submit' size='sm' color='secondary'>
            Salvar
          </Button>
        </div>
      </form>
    </div>

  );
}
