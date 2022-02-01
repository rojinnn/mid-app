import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Particular from "./ParticularItem";
import { sampleRecords as sample} from "./constants";

function List() {
  const [records, setRecords] = useState(sample);

  const [newRecordName, setNewRecordName] = useState("Ferrari");
  const [newRecordPrice, setNewRecordPrice] = useState(0.0);

  const recordNameRef = useRef(null);
  const recordPriceRef = useRef(null);
  const [total, setTotal] = useState(0);

  const [editMode, setEditMode] = useState(false);

  const [selectedRecordId, setSelectedRecordId] = useState(null);

  useEffect(() => {
    const recordsStored = localStorage.getItem('records-stored');
    if(!!recordsStored) {
      setRecords(JSON.parse(recordsStored));
    }
  },[])

  useEffect(() => {
    setTotal(records.reduce((a, v) => a + +v.price, 0));
  }, [records]);

  useEffect(() => {
    if (!editMode) {
      setNewRecordPrice(0);
      setNewRecordName("");
    }
  }, [editMode]);

  const addNewRecord = () => {
    setRecords([
      ...records,
      {
        id: new Date().getMilliseconds(),
        name: newRecordName,
        price: newRecordPrice,
      },
    ]);
    localStorage.setItem('records-stored',JSON.stringify([
      ...records,
      {
        id: new Date().getMilliseconds(),
        name: newRecordName,
        price: newRecordPrice,
      },
    ]));

    setNewRecordName("");
    setNewRecordPrice(0);
    recordNameRef.current.focus();
  };

  const removeRecord = (e, name) => {
    setRecords(records.filter((x) => x.name !== name));
    localStorage.setItem('records-stored',JSON.stringify(records.filter((x) => x.name !== name)));
  };

  const handleEditRecord = (e, name, price, id) => {
    console.log(name, price);
    setNewRecordName(name);
    setNewRecordPrice(price);
    setEditMode(true);
    setSelectedRecordId(id);
  };

  const updateRecord = (e, id) => {
    // console.log(name, price);
    // setNewRecordName(name);
    // setNewRecordPrice(price);
    // setEditMode(true);
    setRecords(
      records.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            name: newRecordName,
            price: newRecordPrice,
          };
        }
        return r;
      })
    );
    localStorage.setItem('records-stored', JSON.stringify(records.map((r) => {
      if (r.id === id) {
        return {
          ...r,
          name: newRecordName,
          price: newRecordPrice,
        };
      }
      return r;
    })));
    setEditMode(false);
    // setNewRecordName('');
    // setNewRecordPr('');
  };

  const handlePressEnterAtRecordName = (e) => {
    if (e.code === "Enter") {
      recordPriceRef.current.focus();
    }
  };

  const handlePressEnterAtRecordPrice = (e) => {
    if (e.code === "Enter") {
      addNewRecord();
    }
  };

  return (
    <div className="basic-list">
      <div className="records-container">
        {records.map((r, i) => (
          <Particular
            key={r.name}
            title={r.name}
            price={r.price}
            id={r.id}
            sn={i + 1}
            onRemove={removeRecord}
            onEdit={handleEditRecord}
          />
        ))}
        {records.length > 0 ? (
          <Particular title={"Total"} price={total} />
        ) : (
          <div>
            <span>No Records found!!</span>
          </div>
        )}
      </div>
      <div className="input-container">
        <div className="name-input">
          <input
            ref={recordNameRef}
            type="text"
            placeholder="Record Name"
            value={newRecordName}
            onChange={(e) => setNewRecordName(e.target.value)}
            onKeyPress={handlePressEnterAtRecordName}
          />
        </div>
        <div className="price-input">
          <input
            ref={recordPriceRef}
            type="number"
            placeholder="Record Price"
            value={newRecordPrice}
            onChange={(e) => setNewRecordPrice(e.target.value)}
            onKeyPress={handlePressEnterAtRecordPrice}
          />
        </div>
        <div className="add-record">
          <button
            onClick={(e) =>
              !editMode ? addNewRecord() : updateRecord(e, selectedRecordId)
            }
          >
            <span>{`${editMode ? "Update" : "Add"} Record`}</span>
          </button>
          {editMode && (
            <button onClick={(e) => setEditMode(false)}>
              <span>cancel</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
