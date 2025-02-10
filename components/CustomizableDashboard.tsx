// import { useState } from "react"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// const defaultWidgets = [
//   { id: "recent-rpps", title: "Recent RPPs" },
//   { id: "analytics", title: "Analytics Overview" },
//   { id: "popular-subjects", title: "Popular Subjects" },
// ]

// export function CustomizableDashboard() {
//   const [widgets, setWidgets] = useState(defaultWidgets)

//   const onDragEnd = (result) => {
//     if (!result.destination) return

//     const newWidgets = Array.from(widgets)
//     const [reorderedItem] = newWidgets.splice(result.source.index, 1)
//     newWidgets.splice(result.destination.index, 0, reorderedItem)

//     setWidgets(newWidgets)
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="dashboard">
//         {(provided) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
//           >
//             {widgets.map((widget, index) => (
//               <Draggable key={widget.id} draggableId={widget.id} index={index}>
//                 {(provided) => (
//                   <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>{widget.title}</CardTitle>
//                       </CardHeader>
//                       <CardContent>{/* Widget content goes here */}</CardContent>
//                     </Card>
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   )
// }

