// app/api/lessons/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// GET - Fetch single lesson
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const lessonDoc = await getDoc(doc(db, "lessons", id));

    if (!lessonDoc.exists()) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: lessonDoc.id,
      ...lessonDoc.data(),
    });
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return NextResponse.json(
      { error: "Failed to fetch lesson" },
      { status: 500 }
    );
  }
}

// PUT - Update lesson
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { courseId, title, description, duration, videoUrl, content } = body;

    // Validation
    if (!courseId || !title || !description || !duration || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { id } = await context.params;
    const lessonRef = doc(db, "lessons", id);
    const lessonDoc = await getDoc(lessonRef);

    if (!lessonDoc.exists()) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const updateData = {
      courseId: courseId.trim(),
      title: title.trim(),
      description: description.trim(),
      duration: duration.trim(),
      videoUrl: videoUrl?.trim() || "",
      content: content.trim(),
      updatedAt: serverTimestamp(),
    };

    await updateDoc(lessonRef, updateData);

    return NextResponse.json({
      id,
      ...updateData,
      message: "Lesson updated successfully",
    });
  } catch (error) {
    console.error("Error updating lesson:", error);
    return NextResponse.json(
      { error: "Failed to update lesson" },
      { status: 500 }
    );
  }
}

// DELETE - Delete lesson
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const lessonRef = doc(db, "lessons", id);
    const lessonDoc = await getDoc(lessonRef);

    if (!lessonDoc.exists()) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    await deleteDoc(lessonRef);

    return NextResponse.json({
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return NextResponse.json(
      { error: "Failed to delete lesson" },
      { status: 500 }
    );
  }
}
