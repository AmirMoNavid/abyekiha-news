import { useState } from 'react';
import Btn from '../../buttons/btn';
import { LuX } from 'react-icons/lu';

const MultiValueInput = ({ name = '', values = [], className = '' }) => {
  console.log(values);
  const [search, setSearch] = useState('');
  const [_values, setValues] = useState(values);
  const [selectedValues, setSelectedValues] = useState < typeof values > [];

  const addTag = (value) => {
    // add tag to "selectedValues", and remove them from "_values"
    const uniqueValues = new Set([...selectedValues, value]);

    setValues(_values.filter((v) => v.id !== value.id));
    setSelectedValues([...uniqueValues]);
  };

  const removeTag = (value) => {
    // remove tag from "selectedValues", and add to "_values"
    const uniqueValues = new Set([..._values, value]);

    setValues([...uniqueValues]);
    setSelectedValues(selectedValues.filter((v) => v.id !== value.id));
  };

  return (
    <div
      onBlur={(e) => {
        if (!e.nativeEvent.relatedTarget) setSearch('');
      }}
      suppressContentEditableWarning={true}
      className={className}
    >
      <input
        name={name}
        value={selectedValues.map((v) => v.id).join(',')}
        type="text"
        className="invisible hidden"
      />
      <div className="f-center-start gap-2 mb-2">
        {selectedValues.map((val, index) => (
          <span
            key={index}
            className="rounded-md f-center-start max-w-fit w-auto bg p-1 border border-color"
          >
            {val.name}
            <button key={index} onClick={() => removeTag(val)}>
              <LuX size="18" className="mr-0.5" />
            </button>
          </span>
        ))}
      </div>

      <div className="ltr relative w-full f-center">
        <input
          onInput={(e) => setSearch(e?.target?.['value'])}
          type="text"
          placeholder="Search.."
        />
        {search.length > 1 && (
          <div className="w-[98%] mx-auto top-10 border shadow-md z-40 mt-1 absolute rounded-md max-h-40 !bg-[#fff] overflow-y-auto">
            {_values.map((val, index, arr) =>
              val.name.toLowerCase().includes(search.toLowerCase()) ? (
                <Btn
                  key={index}
                  className={`${index !== arr.length - 1 && 'border-b border-black-300 border-opacity-40'} opacity-50 hover:opacity-100 flex w-full`}
                  onClick={() => {
                    addTag(val);
                  }}
                >
                  {val.name}
                </Btn>
              ) : (
                index === 0 && (
                  <span className="px-3 py-2 flex">
                    No Matching Item Found..
                  </span>
                )
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiValueInput;
