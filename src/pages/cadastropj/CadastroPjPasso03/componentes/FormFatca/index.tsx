import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from '../../../../../store';
import { Nif } from '../../../../../models/conta';
import { initialFatca } from '../../../../../store/initialValues';
import {
  addFatca,
  setHideFormFatca,
  updateFatca,
} from '../../../../../store/rootSlice';
import Input from '../../../../../components/forms/Input/input';
import Select from '../../../../../components/forms/Select';
import Separator from '../../../../../components/forms/Separator';
import Button from '../../../../../components/forms/Button';

export interface FormFatcaProps {
  visible: boolean;
  pessoaProprietariaId: string;
}

export default function FormFatca(props: FormFatcaProps) {
  const cliente = useSelector((state: RootState) => state.cliente);
  const selectedFatca = useSelector((state: RootState) => state.selectedFatca);
  const dispatch = useDispatch();
  let textClass = '';

  if (props.visible) {
    textClass = '';
  } else {
    textClass = 'hidden';
  }

  const validationSchema = Yup.object().shape({
    referencia: Yup.string().required('O campo Referência é obrigatório'),
    pais: Yup.string().required('O campo País é obrigatório'),
    numero: Yup.number(),
    motivo: Yup.string(),
  });

  const onSubmit = (values: Nif) => {
    if (cliente != null && cliente.pessoasProprietarias != null) {
      const nifs = cliente.pessoasProprietarias.find(
        (i) => i.id == props.pessoaProprietariaId
      )?.nifs as Nif[];
      if (nifs.filter((i) => i.id == selectedFatca.id).length == 0)
        formik.setFieldValue('id', uuidv4());
      dispatch(addFatca(formik.values));
    } else {
      dispatch(updateFatca(formik.values));
    }

    formik.resetForm();
    dispatch(setHideFormFatca());
  };

  let initialValues: Nif = initialFatca;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });

  const handleCancel = () => {
    formik.resetForm();
    dispatch(setHideFormFatca());
  };

  useEffect(() => {
    formik.setFieldValue(
      'pessoaControladoraId',
      props.pessoaProprietariaId as string
    );
  }, [formik.values]);

  return (
    <div className={`${textClass}`}>
      <form onSubmit={formik.handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4'>
          <Select
            label='Referência'
            id='referencia'
            name='referencia'
            value={formik.values.referencia}
            error={formik.errors.referencia}
            touched={formik.touched.referencia}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value='Para nacionalidade'>Para nacionalidade</option>
            <option value='Para residência fiscal'>
              Para residência fiscal
            </option>
            <option value='Para visto de permanencia'>
              Para visto de permanencia
            </option>
          </Select>

          <Select
            label='Referência'
            id='referencia'
            name='referencia'
            value={formik.values.referencia}
            error={formik.errors.referencia}
            touched={formik.touched.referencia}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value='Para nacionalidade'>Afeganistão</option>
            <option value='Para residência fiscal'>Alemanha</option>
            <option value='Para visto de permanencia'>Argentina</option>
            <option value='Para visto de permanencia'>Brasil</option>
            <option value='Para visto de permanencia'>Estados Unidos</option>
            <option value='Para visto de permanencia'>Espanha</option>
            <option value='Para visto de permanencia'>França</option>
            <option value='Para visto de permanencia'>Inglaterra</option>
            <option value='Para visto de permanencia'>Itália</option>
          </Select>

          <Input label='numero' type='number' />

          <Select
            label='Motivo'
            id='motivo'
            name='motivo'
            value={formik.values.motivo}
            error={formik.errors.motivo}
            touched={formik.touched.motivo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value='Para nacionalidade'>
              Estou aguardando a emissão do número
            </option>
            <option value='Para residência fiscal'>
              Renunciei/abdiquei a nacionalidade
            </option>
            <option value='Para visto de permanencia'>
              Minha jurisdição não exige o NIF
            </option>
            <option value='Para visto de permanencia'>
              Sou dispensado do NIF de acordo com as regras do órgão de emissão
            </option>
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
