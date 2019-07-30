const { useState, useRef, useEffect } = React;
function useTabState() {
  const [tabState, setCardState] = useState({
    isActive: false
  });
  const handleClick = e => {
    setCardState({
      isActive: !tabState.isActive
    });
  };
  return {
    tabState,
    tabClick: handleClick,
    toggleTabOpen: () => setCardState({ isActive: true }),
    toggleTabClose: () => setCardState({ isActive: false })
  };
}

let pushed = [];
const Tab = props => {
  const inputEl = useRef();
  const { tabState, tabClick, toggleTabClose, toggleTabOpen } = useTabState();

  useEffect(() => {
    console.log("Load");
    let isActiveClass = props.className
      ? props.className.indexOf("active") === 0
      : false;
    if (isActiveClass) {
      inputEl.current.click();
    }
  }, []);

  const handleClick = e => {
    if (pushed.length > 0) {
      let currentElement = pushed[0];
      if (currentElement.index !== props.index) {
        if (!currentElement.tabState.isActive === true) {
          currentElement.toggleTabClose();
        }
        pushed = [];
      }
    }
    if (tabState.isActive === true) {
      tabClick();
    } else {
      if (pushed.length == 0) {
        pushed.push({ props, tabState, tabClick, toggleTabClose });
      }
      tabClick();
    }
  };

  let classItem = tabState.isActive ? "active" : "inactive";

  return (
    <div>
      <button
        ref={inputEl}
        className={classItem}
        style={{
          position: "absolute",
          top: 0,
          width: "90px",
          height: "30px",
          background: tabState.isActive ? "black" : "white",
          left: props.index * 95,
          transition: "all 400ms ease",
          color: tabState.isActive ? "white" : "black",
          border: "none"
        }}
        onClick={handleClick}
      >
        {props.name ? props.name.toUpperCase() : "button " + props.index}
      </button>
      <div
        style={{
          position: "absolute",
          top: 35,
          width: "90vw",
          background: "#CCC",
          height: tabState.isActive ? "60vh" : "0vh",
          overflow: "hidden",
          transition: "all 400ms ease",
          textAlign: "center"
        }}
      >
        <h1>{props.name.toUpperCase()}</h1>
        {props.children ? props.children() : ""}
      </div>
    </div>
  );
};