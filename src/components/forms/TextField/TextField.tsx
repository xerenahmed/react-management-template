import React, { FC } from 'react';
import { TextField as MUITextField, TextFieldProps } from '@mui/material';
import { useFormik } from 'formik';

type Props = {
    formik?: ReturnType<typeof useFormik<any>>;
    field: string;
} & TextFieldProps;

const TextField: FC<Props> = ({ formik, field, ...props }) => {
    return (
        <MUITextField
            name={field}
            value={formik?.values[field]}
            onChange={formik?.handleChange}
            error={formik?.touched[field] && Boolean(formik.errors[field])}
            helperText={formik?.touched[field] && (formik.errors[field] as any)}
            {...props}
        />
    );
};

export default TextField;
