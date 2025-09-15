// app/api/lessons/route.ts
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

// GET - Fetch all lessons
export async function GET() {
  try {
    const lessonsRef = collection(db, "lessons");
    const q = query(lessonsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const lessons = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json({ lessons }, { status: 200 });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      { error: "Failed to fetch lessons" }, 
      { status: 500 }
    );
  }
}

// POST - Create new lesson
export async function POST(request: NextRequest) {
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
    
    const lessonData = {
      courseId: courseId.trim(),
      title: title.trim(),
      description: description.trim(),
      duration: duration.trim(),
      videoUrl: videoUrl?.trim() || "",
      content: content.trim(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, "lessons"), lessonData);
    
    return NextResponse.json(
      { 
        id: docRef.id,
        ...lessonData,
        message: "Lesson created successfully" 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json(
      { error: "Failed to create lesson" }, 
      { status: 500 }
    );
  }
}