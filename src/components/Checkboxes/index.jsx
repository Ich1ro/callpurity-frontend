import React from 'react'
import { useController } from 'react-hook-form';

const Checkboxes = ({ options, control, name }) => {
    const { field } = useController({
      control,
      name
    });
    return (
      <>
        {options.map((option, index) => (
          <input
            onChange={(e) => {
              const valueCopy = [...field.value];
  
              valueCopy[index] = e.target.checked ? e.target.value : null;
              if (option !== "a" && e.target.checked) valueCopy[0] = "a";
              field.onChange(valueCopy);
            }}
            key={option}
            type="checkbox"
            checked={field.value.includes(option)}
            value={option}
          />
        ))}
      </>
    );
  };

export default Checkboxes