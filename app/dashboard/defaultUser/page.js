// Default User Dashboard

"use client";
import  React , { useState } from 'react';

// importing from dnd-kit for widget implementation and styling
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

const initialWidgets = [
    { id: "apply", name: "Application", visible: true},
    { id: "sponsorInfo", name: "Sponsor Information", visible: true},
    { id: "help", name: "Help", visible: true},
  ];

export default function DriverDashboard() {
    const [widgets, setWidgets] = useState (initialWidgets);

    // sensors for dragging widgets
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor)
    );

    // function to handle drag and drop
    const handleDrag = (event) => {
        // defining events
        // active == currently being dragged
        // over == hovering over possible placement
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = widgets.findIndex((widget) => widget.id === active.id);
        const newIndex = widgets.findIndex((widget) => widget.id === over.id);
        setWidgets(arrayMove(widgets, oldIndex, newIndex));
    };
    
    // function to toggle widget visibility
    const toggleWidget = (id) => {
        setWidgets((prev) =>
        prev.map((w) => (w.id === id ? {...w, visible: !w.visible} : w))
        );
    };

    // page
    return (
        <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>
    
        {/* Widget Selection */}
        <div className="mb-4">
            <h2 className="text-lg font-semibold">Select Widgets</h2>
            {widgets.map((widget) => (
            <div key={widget.id} className="flex items-center space-x-2">
                <input
                type="checkbox"
                checked={widget.visible}
                onChange={() => toggleWidget(widget.id)}
                />
                <label>{widget.name}</label>
            </div>
            ))}
        </div>
    
        {/* Draggable Widgets */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDrag}>
            <SortableContext items={widgets.map((w) => w.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
                {widgets.filter((w) => w.visible).map((widget) => (
                <SortableWidget key={widget.id} widget={widget} />
                ))}
            </div>
            </SortableContext>
        </DndContext>
        </div>
    );
}

// making widgets sortable
function SortableWidget({widget}) {
const { attributes, listeners, setNodeRef, transform, transition} = useSortable({ id: widget.id });

const style = {
    transform: CSS.Transform.toString(transform),
    transition,
};

return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="bg-gray-200 p-4 rounded-md shadow-md cursor-grab">
    {getWidgetContent(widget.id)}
    </div>
);
}


  // widget components
  // some hardcoded bc not connected to db yet
  function getWidgetContent(id) {
    switch (id) {
      case "apply":
        return <Widget title="Application" content="Click here to apply to a sponsor!" link="/apply" />;
      case "sponsorInfo":
        return <Widget title="Sponsor Information" content="Click here to view information about available sponsors!" link="/sponsorInfo"/>;
      case "help":
        return <LinkWidget title="Help" link="/help" />;
      default:
        return null;
    }
  }


// generic widget
function Widget({ title, content }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p>{content}</p>
    </div>
  );
}

// link widget for widgets that will lead to other pages in the future
function LinkWidget ({ title, link }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <Link href={link} className="text-blue-500">Go to {title}</Link>
    </div>
  );
}