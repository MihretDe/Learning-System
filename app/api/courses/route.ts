// app/api/courses/route.ts
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

// GET - Fetch all courses
export async function GET() {
  try {
    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const courses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" }, 
      { status: 500 }
    );
  }
}

// POST - Create new course
export async function POST(request: NextRequest) {
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
    
    const courseData = {
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      instructor: instructor.trim(),
      imageUrl: imageUrl?.trim() || "",
      price: Number(price),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, "courses"), courseData);
    
    return NextResponse.json(
      { 
        id: docRef.id,
        ...courseData,
        message: "Course created successfully" 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" }, 
      { status: 500 }
    );
  }
}