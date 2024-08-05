import { FormProvider as Form } from "react-hook-form";
import PropTypes from 'prop-types';

//-------------------------------------------------------

FormProvider.propTypes = {
    children: PropTypes.node.isRequired,
    methods: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
};
//boc lai form
export default function FormProvider({ children, onSubmit, methods }) {
    return (
        <Form {...methods} >
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    );
}