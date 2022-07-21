import { Input } from 'antd';
import React, { FC } from 'react';
import { ICustomInput } from './ICustomInput';

const CustomInput: FC<ICustomInput> = ({ dataTestId, type, onChange, value, label, readOnly, size }) => {
    return <Input data-testid={dataTestId} className="inpt-1" size={size ? size : "large"} type={type} readOnly={readOnly} onChange={onChange} value={value} placeholder={label} />
}

export default React.memo(CustomInput);