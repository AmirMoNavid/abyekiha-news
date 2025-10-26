import { ReactElement, useContext } from 'react';
import CheckboxInput from '../checkboxInput';
import FileInput from '../fileInput';
import MultiValueInput from '../multiValueInput';
import TextEditor from './textEditor';
// import { T_EditorProps } from '../../../../types/T_EditorProps';
import Err from '../../../err';
import SubmitBtn from '../../../buttons/submitBtn';
import { AuthContext } from '../../../../contexts/authContext';
import OptionsInput from '../optionsInput';
import TextInput from '../textInput';

const getInputElement = ({ props, data }) => {
  const dataKey = props?.['name'];

  switch (props.type) {
    case 'text':
    case 'password':
    case 'email':
      return (
        <TextInput
          defaultValue={
            data?.[dataKey] !== undefined && props.type !== 'password'
              ? data?.[dataKey]
              : ''
          }
          name={dataKey}
          type={props.type}
        />
      );

    case 'rich-text':
      return (
        <TextEditor
          id={dataKey}
          label={props.label}
          defaultValue={data?.[dataKey]}
          name={dataKey}
        />
      );

    case 'multi-value':
      return (
        <MultiValueInput
          name={dataKey}
          values={props.values}
          className={props.className}
        />
      );

    case 'file':
      return (
        <FileInput
          id={dataKey}
          name={dataKey}
          accept={props.accept}
          maxSize={props.maxSize}
          showFilePreview={props.showFilePreview}
          className="aspect-video w-full max-w-[500px]"
        />
      );

    case 'checkbox':
      return (
        <CheckboxInput
          className="w-full"
          id={dataKey}
          name={dataKey}
          text={props.placeholder}
        />
      );

    case 'options':
      return (
        <OptionsInput
          showEmptyOption={props.showEmptyOption}
          name={dataKey}
          id="options"
          className="w-full p-2 bg rounded-md"
          options={props.options}
          defaultValue={data?.[dataKey]}
        />
      );
  }
};

const EditorBox = ({ inputs, send, endPoint }) => {
  const { editorBoxState, setEditorBoxState } = useContext(AuthContext);

  return (
    <form onSubmit={send} className="gap-y-2 f-start-start flex-wrap">
      {editorBoxState.data?.id && (
        <input
          hidden
          readOnly
          name="id"
          defaultValue={editorBoxState.data?.id}
          type="text"
        />
      )}

      <div className="w-full f-start-start flex-col gap-x-5">
        {inputs.map((props, index) => (
          <div className="w-full mb-5 is-flex flex-col" key={index}>
            {props.type !== 'checkbox' && (
              <span className="mb-1 block">{props?.placeholder}</span>
            )}

            {getInputElement({
              props,
              data: editorBoxState.data,
            })}
          </div>
        ))}
      </div>

      <Err />

      <SubmitBtn className="px-3 mb-7 mt-2 is-success button">
        {editorBoxState.isEditMode ? 'ویرایش' : 'افزودن'}
      </SubmitBtn>
    </form>
  );
};

export default EditorBox;
