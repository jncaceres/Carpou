import React, { useState } from "react";
import { routes } from "../api";
import { TripPassengerRequestCard } from "./TripPassengerRequestCard";

export const TripPassengerRequests = (props) => {
  const { passengerRequests } = props;
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationColor, setNotificationColor] = useState("");
  const [pendingRequests, setPendingRequests] = useState(
    passengerRequests.filter((pr) => pr.status == "pending")
  );
  const [answeredRequests, setAnsweredRequests] = useState(
    passengerRequests.filter((pr) => pr.status != "pending")
  );

  const csrf = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAccept = (passengerRequest) => {
    fetch(routes.passenger_requests.show(passengerRequest.id) + `.json`, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": csrf,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accepted" }),
    }).then(() => {
      setNotificationText("Solicitud aceptada exitosamente.");
      setNotificationColor("is-success");
      setShowNotification(true);
      setPendingRequests(
        pendingRequests.filter((pr) => pr.id != passengerRequest.id)
      );
      setAnsweredRequests([
        { ...passengerRequest, status: "accepted" },
        ...answeredRequests,
      ]);
      scrollToTop();
    });
  };

  const handleReject = (passengerRequest) => {
    fetch(routes.passenger_requests.show(passengerRequest.id) + `.json`, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": csrf,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "rejected" }),
    }).then(() => {
      setNotificationText("Solicitud rechazada exitosamente.");
      setNotificationColor("is-info");
      setShowNotification(true);
      setPendingRequests(
        pendingRequests.filter((pr) => pr.id != passengerRequest.id)
      );
      setAnsweredRequests([
        { ...passengerRequest, status: "rejected" },
        ...answeredRequests,
      ]);
      scrollToTop();
    });
  };

  return (
    <div className="columns is-mobile is-multiline">
      <div className="column is-full">
        <div className="content"></div>
        <h1 className="subtitle">Solicitudes pendientes</h1>
        {showNotification && (
          <div className={`notification ${notificationColor}`}>
            <button
              className="delete"
              onClick={() => setShowNotification(false)}
            ></button>
            {notificationText}
          </div>
        )}
      </div>
      {pendingRequests.length ? (
        pendingRequests.map((pr, key) => (
          <div key={key} className="column is-full-mobile">
            <TripPassengerRequestCard
              passengerRequest={pr}
              handleAccept={handleAccept}
              handleReject={handleReject}
            />
          </div>
        ))
      ) : (
        <div className="column is-full pt-0">
          No tienes solicitudes pendientes
        </div>
      )}
      <div className="column is-full">
        <div className="content"></div>
        <h1 className="subtitle">Solicitudes Respondidas</h1>
      </div>
      {answeredRequests.length ? (
        answeredRequests.map((pr, key) => (
          <div key={key} className="column is-full-mobile">
            <TripPassengerRequestCard
              passengerRequest={pr}
              showButtons={false}
              labelText={pr.status == "accepted" ? "Aceptada" : "Rechazada"}
              labelColor={pr.status == "accepted" ? "is-success" : "is-danger"}
            />
          </div>
        ))
      ) : (
        <div className="column is-full pt-0">
          A??n no has aceptado ninguna solicitud
        </div>
      )}
    </div>
  );
};
