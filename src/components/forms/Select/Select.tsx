import React, { FC } from 'react';
import { FormControl, FormHelperText, InputLabel, Select as MUISelect, SelectProps } from '@mui/material';
import { useFormik } from 'formik';

type Props = {
    formik?: ReturnType<typeof useFormik<any>>;
    field: string;
} & SelectProps;

const Select: FC<Props> = ({ formik, field, ...props }) => {
    const errorContent = formik?.touched[field] && (formik.errors[field] as any);
    return (
        <FormControl error={formik?.touched[field] && Boolean(formik.errors[field])}>
            <InputLabel>{props.label}</InputLabel>
            <MUISelect name={field} value={formik?.values[field]} onChange={formik?.handleChange} {...props}>
                {props.children}
            </MUISelect>

            {errorContent && <FormHelperText>{errorContent}</FormHelperText>}
        </FormControl>
    );
};

export default Select;
