import React, { ChangeEvent, FC, HTMLProps, useRef } from 'react';
import { useFormik } from 'formik';
import { Box, BoxProps } from '@mui/system';
import { SvgIconProps, Typography } from '@mui/material';
import { UploadFileOutlined } from '@mui/icons-material';

type Props = {
    formik?: ReturnType<typeof useFormik<any>>;
    field: string;
    label: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    changeMode?: 'append' | 'set';
    inputProps?: HTMLProps<HTMLInputElement>;
    iconProps?: SvgIconProps;
} & BoxProps;

const Upload: FC<Props> = ({
    formik,
    field,
    label,
    inputProps,
    changeMode = 'append',
    onChange,
    iconProps,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <Box
            {...props}
            sx={{
                width: '200px',
                height: '80px',
                border: '1px dashed gray',
                borderRadius: 2,
                padding: 3,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:hover': {
                    border: '2px dashed black',
                },
                ...props?.sx,
            }}
            onClick={() => inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                style={{ display: 'none' }}
                type={'file'}
                accept={'.jpg, .jpeg, .png, .webp'}
                onChange={(event) => {
                    if (formik) {
                        const files = event.target.files;
                        if (changeMode === 'set') {
                            formik.setFieldValue(field, files ? Array.from(files) : files);
                        } else if (!!files) {
                            const newValue = [...formik.values[field], ...Array.from(files)];
                            formik.setFieldValue(field, newValue);
                        }
                    } else if (!!onChange) {
                        onChange(event);
                    }
                }}
                {...inputProps}
            ></input>
            <UploadFileOutlined {...iconProps} sx={{ fontSize: '64px', color: '#333', ...iconProps?.sx }} />
            <Typography fontWeight={500}>{label}</Typography>
        </Box>
    );
};

export default Upload;
