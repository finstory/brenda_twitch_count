import { getDatabase, ref, onValue, set, get, child } from "firebase/database";
import React, { useState, useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import { useLocation } from "react-router-dom";

const Counter = () => {
  const [count, setCount] = useState(100);
  const [pause, setPause] = useState(false);
  const { formatSecondsToTime } = useTimer();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editMode = queryParams.get("edit");

  function getRTime() {
    const db = getDatabase();
    const starCountRef = ref(db, "time");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data);
    });
  }

  function getPause() {
    const db = getDatabase();
    const starCountRef = ref(db, "pause");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setPause(data);
    });
  }

  function updatePause() {
    const db = getDatabase();
    set(ref(db, "pause"), !pause);
  }

  const getTimeOnce = async () => {
    const dbRef = ref(getDatabase());
    let result = "";
    await get(child(dbRef, `time`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          result = snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  };

  async function addTime(sec, active) {
    const realTime = await getTimeOnce();
    const db = getDatabase();
    if (!pause)
      if (realTime > 0 || active) set(ref(db, "time"), realTime + sec);
  }

  function resetTime() {
    const db = getDatabase();
    set(ref(db, "time"), 0);
  }

  // async function setTime(value) {
  //   const realTime = getTimeOnce();
  //   const db = getDatabase();
  //   set(ref(db, "time"), value);
  // }

  useEffect(() => {
    getRTime();
    getPause();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     addTime(-1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    let interval;

    if (pause) {
      clearInterval(interval);
    } else {
      console.log("si");
      if (editMode !== "yes")
        interval = setInterval(() => {
          addTime(-1);
        }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [pause]);

  return (
    <>
      <div className="count">
        <div className="img_wrap">
          <img
            src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1707202745/twitch_api_to_take_roll/access_time_r1wzab.png"
            alt="clock"
          />
        </div>
        <p>{formatSecondsToTime(count)}</p>
      </div>

      {editMode === "yes" ? (
        <div className="edit_count">
          <div className="left_time">
            <button
              onClick={() => {
                addTime(60 * 3 * -1);
              }}
            >
              - 3min
            </button>
            <button
              onClick={() => {
                addTime(60 * 5 * -1);
              }}
            >
              - 5min
            </button>
            <button
              onClick={() => {
                addTime(60 * 10 * -1);
              }}
            >
              - 10min
            </button>
            <button
              onClick={() => {
                addTime(60 * 20 * -1);
              }}
            >
              - 20min
            </button>
            <button
              onClick={() => {
                addTime(60 * 120 * -1);
              }}
            >
              - 2hs
            </button>
            <button
              onClick={() => {
                addTime(60 * 60 * 24 * -1);
              }}
            >
              - 1 día
            </button>
          </div>
          <div className="add_time">
            <button
              onClick={() => {
                addTime(60 * 3, true);
              }}
            >
              + 3min
            </button>
            <button
              onClick={() => {
                addTime(60 * 5, true);
              }}
            >
              + 5min
            </button>
            <button
              onClick={() => {
                addTime(60 * 10, true);
              }}
            >
              + 10min
            </button>
            <button
              onClick={() => {
                addTime(60 * 20, true);
              }}
            >
              + 20min
            </button>
            <button
              onClick={() => {
                addTime(60 * 120, true);
              }}
            >
              + 2hs
            </button>
            <button
              onClick={() => {
                addTime(60 * 60 * 24, true);
              }}
            >
              + 1 día
            </button>
          </div>
          <div className="options">
            <div className="pause_time">
              <button
                onClick={() => {
                  updatePause();
                }}
              >
                {pause ? "REANUDAR" : "PAUSAR"}
              </button>
            </div>
            <div className="reset_time">
              <button
                onClick={() => {
                  resetTime();
                }}
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Counter;
