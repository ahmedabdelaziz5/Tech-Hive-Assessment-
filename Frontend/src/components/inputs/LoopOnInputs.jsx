import { Grid } from '@mui/material';

import { FormikControl } from './';

export const LoopOnInputs = (props) =>
{
    const { inputs, disabled, isEdit, formik } = props;
    
    return (
        <Grid
            container
            rowSpacing={0}
            columnSpacing={{
                xs: 2,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 2
            }}
            maxWidth={"600px"}
        >
            {inputs.map(({ size, xs, ...input }, index) =>{
                const columns = !!size ? size : 12;
                return (
                    <Grid
                        key={index}
                        item
                        xl={columns}
                        lg={columns}
                        md={columns}
                        sm={columns}
                        xs={xs || 12}
                    >
                        <FormikControl
                            disabled={disabled}
                            isEdit={isEdit}
                            formik={formik}
                            {...input}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
}