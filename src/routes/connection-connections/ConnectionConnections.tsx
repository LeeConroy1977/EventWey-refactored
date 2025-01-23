import HomeConnectionCard from "../group-members/HomeConnectionCard";
import { useConnection } from "../../contexts/ConnectionContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { ClipLoader } from "react-spinners";

const ConnectionConnections = () => {
  const { connection, connectionConnections, loading, error } = useConnection();
  const handleConnectionClick = useHandleConnectionClick();

  const connectionsLength = connectionConnections?.length || undefined;
  const firstName = connection?.username.split(" ")[0];

  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-6 desktop:p-10 pb-10">
      <h3 className="font-bold text-textPrimary text-[1rem] xl-screen:text-[18px] mb-8">
        {`${firstName}'s Connections`} (
        <span className="text-primary">{connectionsLength}</span>)
      </h3>

      {loading ? (
        <div className="w-full flex justify-center items-center h-[100px]">
          <ClipLoader size={50} color={"#5d9b9b"} />
        </div>
      ) : error ? (
        <div className="w-full text-red-500 text-center mt-4">{error}</div>
      ) : (connectionsLength ?? 0) > 0 ? (
        <div className="flex flex-row items-start justify-start gap-3 flex-wrap">
          {connectionConnections?.map((connection) => (
            <HomeConnectionCard
              connection={connection}
              key={connection.id}
              handleClick={handleConnectionClick}
            />
          ))}
        </div>
      ) : (
        !loading &&
        (connectionsLength ?? 0) === 0 && (
          <p className="text-gray-500 text-center">No Connections To Show...</p>
        )
      )}
    </div>
  );
};

export default ConnectionConnections;
