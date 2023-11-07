import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { editUser } from "../redux/actions";

import {
  FieldFormContainer,
  // FieldInputWarning,
  EditFieldFormButton,
  FieldInput,
  FormWarnign,
} from "../styles/FieldForm";

export default function FieldForm({ setUserName, id, fieldName, propName, propValue, error }) {
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
      toast.success(`The ${fieldName} has been updated`, {
        position: "top-right",
      });

      setInput("");
      setUserName(false);
    }
  }

  function handleClose(e) {
    e.preventDefault();

    setInput("");
    setUserName(false);
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
            width: "280px",
            border: "none",
            borderBottom: "1px solid #D9D9D9",
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
            padding: "0px",
            gap: "42px",
          }}
        >
          <EditFieldFormButton onClick={(e) => handleClose(e)} color="red">
            Cancel
          </EditFieldFormButton>
          <EditFieldFormButton onClick={(e) => handleSave(e)} color="#622CD4">
            Save
          </EditFieldFormButton>
        </div>
      </div>
      {error && <FormWarnign>{!input && "*this field is required"}</FormWarnign> }
    </FieldFormContainer>
  );
}
