// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Plus, Edit, Trash2, Eye, BookOpen, Clock, Users, FileEdit } from "lucide-react";
// import TestDetailsView from "./TestDetailsView";
// import TestQuestionCreator from "./TestQuestionCreator";

// // Mock data - replace with real data from backend
// const mockTests = [
//   {
//     id: "test1",
//     title: "JEE Main Mathematics - Algebra",
//     category: "JEE",
//     subject: "Mathematics",
//     totalQuestions: 30,
//     duration: 90,
//     difficulty: "Medium",
//     status: "Active",
//     attemptedBy: 156,
//     createdDate: "2024-01-15"
//   },
//   {
//     id: "test2",
//     title: "NEET Biology - Human Physiology", 
//     category: "NEET",
//     subject: "Biology",
//     totalQuestions: 45,
//     duration: 60,
//     difficulty: "Hard",
//     status: "Draft",
//     attemptedBy: 89,
//     createdDate: "2024-01-12"
//   }
// ];

// const categories = ["JEE", "NEET", "UPSC", "GATE"];
// const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Geography", "History", "Computer Science"];
// const difficulties = ["Easy", "Medium", "Hard"];

// const TestManagement = () => {
//   const [tests, setTests] = useState(mockTests);
//   const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
//   const [editingTest, setEditingTest] = useState<any>(null);
//   const [currentView, setCurrentView] = useState<'list' | 'details' | 'questions'>('list');
//   const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     subject: "",
//     duration: "",
//     difficulty: "",
//     status: "Draft"
//   });

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       description: "",
//       category: "",
//       subject: "",
//       duration: "",
//       difficulty: "",
//       status: "Draft"
//     });
//     setEditingTest(null);
//   };

//   const handleCreateTest = () => {
//     const newTest = {
//       id: `test${tests.length + 1}`,
//       ...formData,
//       totalQuestions: 0,
//       duration: parseInt(formData.duration),
//       attemptedBy: 0,
//       createdDate: new Date().toISOString().split('T')[0]
//     };
//     setTests([...tests, newTest]);
//     setIsCreateDialogOpen(false);
//     resetForm();
    
//     // Navigate to question creation
//     setSelectedTestId(newTest.id);
//     setCurrentView('questions');
//   };

//   const handleEditTest = (test: any) => {
//     setEditingTest(test);
//     setFormData({
//       title: test.title,
//       description: test.description || "",
//       category: test.category,
//       subject: test.subject,
//       duration: test.duration.toString(),
//       difficulty: test.difficulty,
//       status: test.status
//     });
//     setIsCreateDialogOpen(true);
//   };

//   const handleUpdateTest = () => {
//     const updatedTests = tests.map(test => 
//       test.id === editingTest.id 
//         ? { ...test, ...formData, duration: parseInt(formData.duration) }
//         : test
//     );
//     setTests(updatedTests);
//     setIsCreateDialogOpen(false);
//     resetForm();
//   };

//   const handleDeleteTest = (testId: string) => {
//     setTests(tests.filter(test => test.id !== testId));
//   };

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case "Easy": return "bg-green-100 text-green-800";
//       case "Medium": return "bg-yellow-100 text-yellow-800";
//       case "Hard": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const handleViewDetails = (testId: string) => {
//     setSelectedTestId(testId);
//     setCurrentView('details');
//   };

//   const handleCreateQuestions = (testId: string) => {
//     setSelectedTestId(testId);
//     setCurrentView('questions');
//   };

//   const handleBackToList = () => {
//     setCurrentView('list');
//     setSelectedTestId(null);
//   };

//   if (currentView === 'details' && selectedTestId) {
//     return (
//       <TestDetailsView 
//         testId={selectedTestId} 
//         onBack={handleBackToList}
//       />
//     );
//   }

//   if (currentView === 'questions' && selectedTestId) {
//     const selectedTest = tests.find(test => test.id === selectedTestId);
//     return (
//       <TestQuestionCreator 
//         testId={selectedTestId}
//         testTitle={selectedTest?.title || "Test"}
//         onBack={handleBackToList}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-foreground">Test Management</h2>
//         <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="flex items-center gap-2" onClick={resetForm}>
//               <Plus size={16} />
//               Create New Test
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-2xl">
//             <DialogHeader>
//               <DialogTitle>
//                 {editingTest ? "Edit Test" : "Create New Test"}
//               </DialogTitle>
//             </DialogHeader>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="title">Test Title</Label>
//                 <Input
//                   id="title"
//                   value={formData.title}
//                   onChange={(e) => setFormData({...formData, title: e.target.value})}
//                   placeholder="Enter test title"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="category">Category</Label>
//                 <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((category) => (
//                       <SelectItem key={category} value={category}>{category}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="subject">Subject</Label>
//                 <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select subject" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {subjects.map((subject) => (
//                       <SelectItem key={subject} value={subject}>{subject}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="duration">Duration (minutes)</Label>
//                 <Input
//                   id="duration"
//                   type="number"
//                   value={formData.duration}
//                   onChange={(e) => setFormData({...formData, duration: e.target.value})}
//                   placeholder="60"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="difficulty">Difficulty</Label>
//                 <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select difficulty" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {difficulties.map((difficulty) => (
//                       <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="status">Status</Label>
//                 <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Draft">Draft</SelectItem>
//                     <SelectItem value="Active">Active</SelectItem>
//                     <SelectItem value="Archived">Archived</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="md:col-span-2 space-y-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({...formData, description: e.target.value})}
//                   placeholder="Enter test description"
//                   rows={3}
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end gap-2 pt-4">
//               <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={editingTest ? handleUpdateTest : handleCreateTest}>
//                 {editingTest ? "Update Test" : "Create Test"}
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Tests Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <BookOpen size={20} />
//             All Tests ({tests.length})
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Test Title</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Subject</TableHead>
//                 <TableHead>Duration</TableHead>
//                 <TableHead>Questions</TableHead>
//                 <TableHead>Difficulty</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Attempts</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {tests.map((test) => (
//                 <TableRow key={test.id}>
//                   <TableCell className="font-medium">{test.title}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className="text-xs">{test.category}</Badge>
//                   </TableCell>
//                   <TableCell>{test.subject}</TableCell>
//                   <TableCell className="flex items-center gap-1">
//                     <Clock size={14} />
//                     {test.duration}m
//                   </TableCell>
//                   <TableCell>{test.totalQuestions}</TableCell>
//                   <TableCell>
//                     <Badge className={`text-xs ${getDifficultyColor(test.difficulty)}`}>
//                       {test.difficulty}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={test.status === "Active" ? "default" : "secondary"} className="text-xs">
//                       {test.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="flex items-center gap-1">
//                     <Users size={14} />
//                     {test.attemptedBy}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Button variant="outline" size="sm" onClick={() => handleEditTest(test)}>
//                         <Edit size={14} />
//                       </Button>
//                       <Button variant="outline" size="sm" onClick={() => handleViewDetails(test.id)}>
//                         <Eye size={14} />
//                       </Button>
//                       <Button variant="outline" size="sm" onClick={() => handleCreateQuestions(test.id)}>
//                         <FileEdit size={14} />
//                       </Button>
//                       <Button 
//                         variant="outline" 
//                         size="sm" 
//                         onClick={() => handleDeleteTest(test.id)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <Trash2 size={14} />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default TestManagement;



import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Clock,
  Users,
  FileEdit,
} from "lucide-react";

import TestDetailsView from "./TestDetailsView";
import TestQuestionCreator from "./TestQuestionCreator";

const categories = [
  "JEE Main",
  "JEE Advanced",
  "NEET",
  "BITSAT",
  "VITEEE",
  "COMEDK",
  "KCET",
  "MHT CET",
  "WBJEE",
];

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Geography",
  "History",
  "Computer Science",
];

const difficulties = ["easy", "medium", "hard"];

const TestManagement = () => {
  const baseurl= import.meta.env.VITE_API_BASE_URL;
  const [tests, setTests] = useState<any[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<any>(null);
  const [currentView, setCurrentView] = useState<
    "list" | "details" | "questions"
  >("list");
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subject: "",
    duration: "",
    difficulty: "",
    // status: "Draft",
  });

  // Fetch tests
  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await axios.get(`${baseurl}/api/admintest`);

      let data = res.data;
      if (Array.isArray(data)) {
        setTests(data);
      } else if (data.tests && Array.isArray(data.tests)) {
        setTests(data.tests);
      } else {
        setTests([]);
      }
    } catch (error) {
      console.error("Error fetching tests", error);
      setTests([]);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      subject: "",
      duration: "",
      difficulty: "",
      // status: "Draft",
    });
    setEditingTest(null);
  };

  // Create Test
  const handleCreateTest = async () => {
    try {
      const res = await axios.post(`${baseurl}/api/admintest`, {
        ...formData,
        duration: parseInt(formData.duration),
      });

      const created =
        res.data.test ||
        res.data ||
        null;

      if (created) {
        setTests([...tests, created]);
        setSelectedTestId(created._id);
        setCurrentView("questions");
      }

      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error creating test", error);
    }
  };

  // Edit Test
  const handleEditTest = (test: any) => {
    setEditingTest(test);
    setFormData({
      title: test.title,
      description: test.description || "",
      category: test.category,
      subject: test.subject,
      duration: test.duration.toString(),
      difficulty: test.difficulty,
      // status: test.status,
    });
    setIsCreateDialogOpen(true);
  };

  // Update Test
  const handleUpdateTest = async () => {
    try {
      const res = await axios.put(`${baseurl}/api/admintest/${editingTest._id}`, {
        ...formData,
        duration: parseInt(formData.duration),
      });

      const updated = res.data.test || res.data;
      setTests(
        tests.map((t) => (t._id === editingTest._id ? updated : t))
      );

      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error updating test", error);
    }
  };

  // Delete Test
  const handleDeleteTest = async (testId: string) => {
    try {
      await axios.delete(`${baseurl}/api/admintest/${testId}`);
      setTests(tests.filter((t) => t._id !== testId));
    } catch (error) {
      console.error("Error deleting test", error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (testId: string) => {
    setSelectedTestId(testId);
    setCurrentView("details");
  };

  const handleCreateQuestions = (testId: string) => {
    setSelectedTestId(testId);
    setCurrentView("questions");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedTestId(null);
    fetchTests();
  };

  // Switch Views
  if (currentView === "details" && selectedTestId) {
    return <TestDetailsView testId={selectedTestId} onBack={handleBackToList} />;
  }

  if (currentView === "questions" && selectedTestId) {
    const selectedTest = tests.find((t) => t._id === selectedTestId);
    return (
      <TestQuestionCreator
        testId={selectedTestId}
        testTitle={selectedTest?.title || "Test"}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Test Management</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={resetForm}>
              <Plus size={16} />
              Create New Test
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTest ? "Edit Test" : "Create New Test"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Test Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter test title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) =>
                    setFormData({ ...formData, subject: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    setFormData({ ...formData, difficulty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  // value={formData.status}
                  onValueChange={(value) =>
                    // setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter test description"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={editingTest ? handleUpdateTest : handleCreateTest}
              >
                {editingTest ? "Update Test" : "Create Test"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen size={20} />
            All Tests ({tests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Difficulty</TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Attempts</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test._id}>
                  <TableCell className="font-medium">{test.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {test.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{test.subject}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Clock size={14} />
                    {test.duration}m
                  </TableCell>
                  <TableCell>{test.questions?.length || 0}</TableCell>
                  <TableCell>
                    <Badge
                      className={`text-xs ${getDifficultyColor(
                        test.difficulty
                      )}`}
                    >
                      {test.difficulty}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>
                    <Badge
                      variant={
                        test.status === "Active" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {test.status}
                    </Badge>
                  </TableCell> */}
                  <TableCell className="flex items-center gap-1">
                    <Users size={14} />
                    {test.takenBy?.length || 0}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTest(test)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(test._id)}
                      >
                        <Eye size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCreateQuestions(test._id)}
                      >
                        <FileEdit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTest(test._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestManagement;
