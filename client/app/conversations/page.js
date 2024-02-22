"use client";
import React from "react";
import Navigation from "@/components/navigation";
import MessageList from "@/components/messageList";
import EmptyState from "@/components/emptyState";

const ConversationsPage = () => {
  return (
    <div className="flex">
      {/* Nav */}
      <Navigation />
      {/* list */}
      <MessageList />
      {/* chat empty */}
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
