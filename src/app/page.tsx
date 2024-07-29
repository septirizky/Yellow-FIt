"use client";

import { useState } from "react";
import Home from "../components/Home";
import CreateLabel from "../components/CreateLabel";
import EditLabel from "../components/EditLabel";
import { Label, User } from "./types";

export default function IndexPage() {
  const [labels, setLabels] = useState<{ [key: string]: string[] }>({
    "Customer Type": ["Acquisition", "Retention"],
    Goals: ["Hidup Sehat", "Turun Berat Badan"],
  });
  const [user] = useState<User>({
    name: "Asroel",
    email: "asroel.dev@gmail.com",
  });
  const [currentLabel, setCurrentLabel] = useState<Label | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = (category: string, label: string) => {
    setLabels((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== label),
    }));
  };

  const handleCreate = (name: string, category: string) => {
    setLabels((prev) => ({
      ...prev,
      [category]: [...prev[category], name],
    }));
    setIsCreating(false);
  };

  const handleEdit = (name: string, category: string) => {
    const updatedLabels = { ...labels };
    updatedLabels[category] = updatedLabels[category].map((item) =>
      item === currentLabel!.name ? name : item
    );
    setLabels(updatedLabels);
    setIsEditing(false);
  };

  const handleStartCreate = () => {
    setIsCreating(!isCreating);
  };

  const handleStartEdit = (label: Label) => {
    setCurrentLabel(label);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
  };

  if (isCreating) {
    return <CreateLabel onCreate={handleCreate} onCancel={handleCancel} />;
  }

  if (isEditing && currentLabel) {
    return (
      <EditLabel
        label={currentLabel}
        onSave={handleEdit}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <Home
      user={user}
      labels={labels}
      onDelete={handleDelete}
      onCreate={handleStartCreate}
      onEdit={handleStartEdit}
    />
  );
}
