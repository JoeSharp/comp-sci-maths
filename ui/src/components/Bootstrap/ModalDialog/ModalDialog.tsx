/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import Modal from "react-modal";
import customStyles from "./customStyles";
import "./ModalDialog.css";

interface ContentProps {
  header: JSX.Element;
  content: JSX.Element;
  actions: JSX.Element;
}

const ModalDialog: React.FunctionComponent<ContentProps & ReactModal.Props> = ({
  header,
  content,
  actions,
  ...rest
}) => {
  return (
    <Modal className={`themed-modal light`} {...rest} style={customStyles}>
      <div className="themed-modal__container">
        <header className="themed-modal__header">{header}</header>
        <div className="themed-modal__content">{content}</div>
        <div className="themed-modal__footer__actions">{actions}</div>
      </div>
    </Modal>
  );
};

export default ModalDialog;
