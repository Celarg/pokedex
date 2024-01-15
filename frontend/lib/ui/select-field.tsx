import React from 'react';

type SelectFieldProps = {
    value: string;
    onChange: (value: string) => void;
    values: { [key:string]:string };
}

const SelectField = ({value, onChange, values}: SelectFieldProps) => {
    return (
        <select
        className='border rounded-md h-full md:basis-1/5 border-green-800 px-3.5 py-1.5 text-[18px]'
            onChange={e => onChange(e.target.value)} value={value}>
            <option label=" " value='' disabled={!value}>{!value ? "Choose type" : "Remove type"}</option>
            <hr/>
            {Object.entries(values).map(([objectKey, objectValue]) => (
                <option key={objectKey} value={objectKey}>
                    {objectValue}
                </option>
            ))}
        </select>
    );
};

export default SelectField;
