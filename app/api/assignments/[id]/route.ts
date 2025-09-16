// app/api/assignments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// GET - Fetch single assignment
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const assignmentDoc = await getDoc(doc(db, "assignments", id));

    if (!assignmentDoc.exists()) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: assignmentDoc.id,
      ...assignmentDoc.data(),
    });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    return NextResponse.json(
      { error: "Failed to fetch assignment" },
      { status: 500 }
    );
  }
}

// PUT - Update assignment
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { courseId, title, description, dueDate, maxPoints, instructions } =
      body;

    // Validation
    if (
      !courseId ||
      !title ||
      !description ||
      !dueDate ||
      !maxPoints ||
      !instructions
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { id } = await context.params;
    const assignmentRef = doc(db, "assignments", id);
    const assignmentDoc = await getDoc(assignmentRef);

    if (!assignmentDoc.exists()) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    const updateData = {
      courseId: courseId.trim(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.trim(),
      maxPoints: Number(maxPoints),
      instructions: instructions.trim(),
      updatedAt: serverTimestamp(),
    };

    await updateDoc(assignmentRef, updateData);

    return NextResponse.json({
      id,
      ...updateData,
      message: "Assignment updated successfully",
    });
  } catch (error) {
    console.error("Error updating assignment:", error);
    return NextResponse.json(
      { error: "Failed to update assignment" },
      { status: 500 }
    );
  }
}

// DELETE - Delete assignment
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const assignmentRef = doc(db, "assignments", id);
    const assignmentDoc = await getDoc(assignmentRef);

    if (!assignmentDoc.exists()) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    await deleteDoc(assignmentRef);

    return NextResponse.json({
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    return NextResponse.json(
      { error: "Failed to delete assignment" },
      { status: 500 }
    );
  }
}
