// app/api/courses/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// GET - Fetch single course
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseDoc = await getDoc(doc(db, "courses", params.id));
    
    if (!courseDoc.exists()) {
      return NextResponse.json(
        { error: "Course not found" }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      id: courseDoc.id,
      ...courseDoc.data()
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" }, 
      { status: 500 }
    );
  }
}

// PUT - Update course
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, category, instructor, imageUrl, price } = body;
    
    // Validation
    if (!title || !description || !category || !instructor || price === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }
    
    const courseRef = doc(db, "courses", params.id);
    const courseDoc = await getDoc(courseRef);
    
    if (!courseDoc.exists()) {
      return NextResponse.json(
        { error: "Course not found" }, 
        { status: 404 }
      );
    }
    
    const updateData = {
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      instructor: instructor.trim(),
      imageUrl: imageUrl?.trim() || "",
      price: Number(price),
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(courseRef, updateData);
    
    return NextResponse.json({
      id: params.id,
      ...updateData,
      message: "Course updated successfully"
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" }, 
      { status: 500 }
    );
  }
}

// DELETE - Delete course
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseRef = doc(db, "courses", params.id);
    const courseDoc = await getDoc(courseRef);
    
    if (!courseDoc.exists()) {
      return NextResponse.json(
        { error: "Course not found" }, 
        { status: 404 }
      );
    }
    
    // Also delete associated lessons and assignments
    const lessonsQuery = query(
      collection(db, "lessons"),
      where("courseId", "==", params.id)
    );
    const lessonsSnapshot = await getDocs(lessonsQuery);
    
    const assignmentsQuery = query(
      collection(db, "assignments"),
      where("courseId", "==", params.id)
    );
    const assignmentsSnapshot = await getDocs(assignmentsQuery);
    
    // Delete all related lessons and assignments
    const deletePromises = [
      ...lessonsSnapshot.docs.map(doc => deleteDoc(doc.ref)),
      ...assignmentsSnapshot.docs.map(doc => deleteDoc(doc.ref))
    ];
    
    await Promise.all(deletePromises);
    
    // Delete the course
    await deleteDoc(courseRef);
    
    return NextResponse.json({
      message: "Course and related content deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" }, 
      { status: 500 }
    );
  }
}