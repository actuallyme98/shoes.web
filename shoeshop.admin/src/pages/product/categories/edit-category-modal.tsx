import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormikTextField from '../../../components/formik-textfield';

// formik
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { useSnackbar } from 'notistack';

// redux
import * as AppActions from '../../../redux/actions/app-action';
import { useDispatch } from 'react-redux';

interface IProps {
  category: REDUX_STORE.ICategory | null;
  open: boolean;
  onClose: () => void;
}

interface FormikValues {
  name: string;
  slug: string;
}

const EditCategoryModal: React.FC<IProps> = (props) => {
  const { open, onClose, category } = props;
  const [pk, setPk] = useState(0);
  const [singleUrl, setSingleUrl] = useState('');
  const [singleFile, setSingleFile] = useState<File>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (category) {
      setPk(category.pk);
    }
  }, [category]);

  const onChangeSingleFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files) {
      setSingleUrl(URL.createObjectURL(files[0]));
      setSingleFile(files[0]);
    }
  }, []);

  const onFormSubmit = useCallback(
    async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
      formikHelpers.setSubmitting(true);
      try {
        await dispatch(
          AppActions.updateCategoryAction({
            ...values,
            pk,
          }),
        );
        onClose();
        enqueueSnackbar('Tạo thành công', {
          variant: 'success',
        });
      } catch (err) {
        const message = String(err).replace(/Error: /g, '');
        enqueueSnackbar(message, {
          variant: 'error',
        });
      }
      formikHelpers.setSubmitting(false);
    },
    [pk],
  );

  const handleChangePk = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPk(parseInt(value));
  };

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        <Formik
          initialValues={{
            name: category?.name.trim() || '',
            slug: category?.slug?.trim() || '',
          }}
          onSubmit={onFormSubmit}
          validationSchema={validateForm}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <FormikTextField
                name="name"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'Tên (*)',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <FormikTextField
                name="slug"
                textFieldProps={{
                  variant: 'outlined',
                  margin: 'normal',
                  fullWidth: true,
                  label: 'slug (*)',
                  placeholder: 'EX: giay-nam',
                  InputLabelProps: {
                    shrink: true,
                    focused: true,
                  },
                }}
              />
              <Box textAlign="center">
                <Box position="relative">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Xác nhận
                  </Button>
                </Box>
              </Box>
              <div>Thumbnail</div>
              <input id="thumnail" type="file" onChange={onChangeSingleFile} /> <br />
              <img className={classes.prevImg} src={singleUrl} alt="" /> <br />
              <FormControl component="fieldset">
                <FormLabel component="legend">Phụ kiện</FormLabel>
                <RadioGroup value={pk} onChange={handleChangePk}>
                  <FormControlLabel value={0} control={<Radio />} label="False" />
                  <FormControlLabel value={1} control={<Radio />} label="True" />
                </RadioGroup>
              </FormControl>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

const validateForm = Yup.object().shape({
  name: Yup.string().required('Trường Bắt Buộc'),
  slug: Yup.string().required('Trường Bắt Buộc').max(6, 'Tối đa 6 kí tự'),
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  prevImg: {
    width: 150,
    marginTop: 5,
  },
}));

export default EditCategoryModal;
