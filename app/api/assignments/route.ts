// app/api/assignments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// GET - Fetch all assignments
export async function GET() {
  try {
    const assignmentsRef = collection(db, "assignments");
    const q = query(assignmentsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const assignments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json({ assignments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return NextResponse.json(
      { error: "Failed to fetch assignments" }, 
      { status: 500 }
    );
  }
}

// POST - Create new assignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, title, description, dueDate, maxPoints, instructions } = body;
    
    // Validation
    if (!courseId || !title || !description || !dueDate || !maxPoints || !instructions) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }
    
    const assignmentData = {
      courseId: courseId.trim(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.trim(),
      maxPoints: Number(maxPoints),
      instructions: instructions.trim(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, "assignments"), assignmentData);
    
    return NextResponse.json(
      { 
        id: docRef.id,
        ...assignmentData,
        message: "Assignment created successfully" 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating assignment:", error);
    return NextResponse.json(
      { error: "Failed to create assignment" }, 
      { status: 500 }
    );
  }
}