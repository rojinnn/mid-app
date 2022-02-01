import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const Particular = ({ title, price, sn, onRemove, onEdit, id }) => {

    // const record = props.record;
    // const { record } = props
      return (
      <div className="record">
                <div className="record-name">
                  <span>{sn}{sn && '] '}</span>
                  <span>{title}</span>
                </div>
                <div className="record-price">
                  <span>{price}</span>
                </div>
                <button
                  onClick={e => onEdit(e, title, price, id)}
                >
                  <span>Edit</span>
                </button>
                <button
                  onClick={e => onRemove(e, title)}
                >
                  <span>X</span>
                </button>
              </div>
      );
    };

export default Particular;
