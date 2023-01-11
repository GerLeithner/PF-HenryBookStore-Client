import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { editUser } from "../redux/actions";

import {
  FieldFormContainer,
  // FieldInputWarning,
  EditFieldFormButton,
  FieldInput,
  FormWarnign,
} from "../styles/FieldForm";

export default function FieldForm({
  setUserName,
  id,
  fieldName,
  propName,
  propValue,
}) {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function handleSave(e) {
    e.preventDefault();

    if (input) {
      dispatch(editUser({ id, [propName]: input }));
      alert(`The ${fieldName} has been edited`);

      setInput("");
      setUserName(false)
    }
  }

  function handleClose(e) {
    e.preventDefault();

    setInput("");
    setUserName(false)
  }

  return (
    <FieldFormContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            border: "1px solid #ccc",
            padding: "0px 30px 0px 30px",
            height: "30px",
          }}
        >
          <FieldInput
            placeholder={propValue}
            value={input}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "max-content",
            padding: "0px 0px 0px 60px",
            height: "30px",
            gap: "150px",
          }}
        >
          <EditFieldFormButton onClick={(e) => handleClose(e)} color="red">
            Discard
          </EditFieldFormButton>
          <EditFieldFormButton onClick={(e) => handleSave(e)}>
            Save
          </EditFieldFormButton>
        </div>
      </div>
      <FormWarnign>{!input && "*this field is required"}</FormWarnign>
    </FieldFormContainer>
  );
}
