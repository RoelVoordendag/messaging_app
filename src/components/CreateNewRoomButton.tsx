interface CreateNewRoomButton {
  handleOnclick: () => void;
}

export default function CreateNewRoomButton({
  handleOnclick,
}: CreateNewRoomButton) {
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#3498db",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={handleOnclick}
        >
          <span style={{ fontSize: "24px", color: "white" }}>+</span>
        </div>
      </div>
    </>
  );
}
