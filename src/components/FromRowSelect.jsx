// src/components/FormRowSelect.jsx
const FormRowSelect = ({ labelText, name, list, defaultValue, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <select
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
