import { getDatabase, ref, onValue, set, get, child } from "firebase/database";
import React, { useState, useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import { useLocation } from "react-router-dom";

const Counter = ({ fantasy }) => {
  const [count, setCount] = useState(100);
  const [pause, setPause] = useState(false);
  const { formatSecondsToTime } = useTimer();

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

  const [breakMessage, setBreakMessage] = useState(false);

  useEffect(() => {
    let interval;

    if (pause) {
      interval = setInterval(() => {
        setBreakMessage(!breakMessage);
        setTimeout(() => {
          setBreakMessage(breakMessage);
        }, 1250);
      }, 4000);
    } else {
      setBreakMessage(false);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [pause]);

  function updateFantasy() {
    const db = getDatabase();
    set(ref(db, "fantasy"), !fantasy);
  }

  return (
    <>
      <div className={`count ${fantasy ? "fantasy" : ""}`}>
        <div className="img_wrap">
          <img
            src={
              fantasy
                ? "https://res.cloudinary.com/dz9smi3nc/image/upload/v1712215764/twitch_api_to_take_roll/temporizador_yr1hgi_ikun6f.png"
                : "https://res.cloudinary.com/dz9smi3nc/image/upload/v1712045412/twitch_api_to_take_roll/temporizador_yr1hgi.png"
            }
            alt="clock"
          />
        </div>
        <p className={fantasy ? "fantasy" : ""}>{formatSecondsToTime(count)}</p>
        <div
          className={`break_message ${fantasy ? "fantasy" : ""}`}
          style={{
            display: breakMessage ? "flex" : "none",
          }}
        >
          <p>YA VUELVO</p>
        </div>
      </div>

      {editMode === "yes" ? (
        <div className={`edit_count ${fantasy ? "fantasy" : ""}`}>
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
                style={{
                  background: pause
                    ? "linear-gradient(180deg, #397c6ac1 0%, #2b9d8a 100%)"
                    : "linear-gradient(180deg, #7c3939c1 0%, #9d2b2b 100%)",
                }}
              >
                {pause ? "ACTIVAR" : "DESACTIVAR"}
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
          <p
            style={{
              fontSize: "2rem",
              padding: "1.2rem",
              textAlign: "center",
              textShadow: "0 0 10px #d0d0d0",
            }}
          >
            {" "}
            {fantasy ? "FINAL FANTASY" : "SONIC"}
          </p>
          <div className="options">
            <div className="skins">
              <button
                onClick={() => {
                  updateFantasy(!fantasy);
                }}
                style={{
                  backgroundImage: fantasy
                    ? 'url("https://res.cloudinary.com/dz9smi3nc/image/upload/v1712221229/twitch_api_to_take_roll/final-fantasy-vii-crisis-core.jpg_976912859_nk7jor.webp")'
                    : 'url("https://res.cloudinary.com/dz9smi3nc/image/upload/v1712220747/twitch_api_to_take_roll/apps.53825.13715845469587517.60dedf91-7527-4ab4-8e98-0071e0f068f6_w9wmnm.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  fontSize: "1.5rem",
                  width: "20rem",
                  padding: "3rem",
                }}
              ></button>
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
