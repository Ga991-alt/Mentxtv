import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit3, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

interface SubscriptionPlan {
  _id?: string;
  planTitle: string;
  price: number;
  duration: number; // number (months)
  description: string;
  features: string[];
  isPremium?: boolean;
  subtitle?: string;
}

const ManageSubscriptionPlans = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { mentorId } = useParams(); // ✅ get mentorId from route params

  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✅ Fetch mentor's 4 plans (or dummy)
  useEffect(() => {
    if (mentorId) {
      axios
        .get(`${baseUrl}/api/subscription-plans/mentor/${mentorId}`)
        .then(async (res) => {
          if (res.data.data && res.data.data.length > 0) {
            setPlans(res.data.data);
          } else {
            // ✅ fallback: fetch default/dummy plans and assign to this mentor
            const dummyRes = await axios.post(
              `${baseUrl}/api/subscription-plans/default`,
              { mentorId }
            );
            setPlans(dummyRes.data.data);
          }
        })
        .catch((err) => {
          console.error("Error fetching plans:", err);
        });
    }
  }, [mentorId]);

  const handleEdit = (plan: SubscriptionPlan) => {
    setEditingPlan({ ...plan });
    setIsDialogOpen(true);
  };

  // ✅ Save single plan (PUT)
  const handleSave = async () => {
    if (editingPlan) {
      try {
        const res = await axios.put(
          `${baseUrl}/api/subscription-plans/${editingPlan._id}`,
          editingPlan
        );

        setPlans(
          plans.map((p) => (p._id === editingPlan._id ? res.data.data : p))
        );
        setIsDialogOpen(false);
        setEditingPlan(null);
      } catch (err) {
        console.error("Error updating plan:", err);
        alert("Failed to update plan.");
      }
    }
  };

  const handleAddFeature = () => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: [...editingPlan.features, ""],
      });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (editingPlan) {
      const newFeatures = [...editingPlan.features];
      newFeatures[index] = value;
      setEditingPlan({
        ...editingPlan,
        features: newFeatures,
      });
    }
  };

  const handleRemoveFeature = (index: number) => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: editingPlan.features.filter((_, i) => i !== index),
      });
    }
  };

  // ✅ Save all plans at once (optional)
  const handleSaveAll = async () => {
    try {
      await Promise.all(
        plans.map((plan) =>
          axios.put(`${baseUrl}/api/subscription-plans/${plan._id}`, plan)
        )
      );
      alert("All changes saved successfully!");
    } catch (err) {
      console.error("Error saving all plans:", err);
      alert("Failed to save all changes.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Manage Subscription Plans
                </h1>
                <p className="text-gray-600 text-sm">
                  Customize your subscription offerings
                </p>
              </div>
            </div>
            <Button
              onClick={handleSaveAll}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              Save All Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan._id}
              className={`relative bg-white shadow-sm border ${
                plan.isPremium ? "border-orange-300 shadow-lg hover:shadow-xl" : ""
              }`}
            >
              <div className="absolute top-4 right-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(plan)}
                  className="flex items-center gap-1"
                >
                  <Edit3 size={14} />
                </Button>
              </div>

              {/* Premium Badge */}
              {plan.isPremium && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className={`pb-4 ${plan.isPremium ? "pt-8" : ""}`}>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {plan.planTitle}
                  {plan.subtitle && (
                    <span className="block text-sm font-normal text-gray-500">
                      {plan.subtitle}
                    </span>
                  )}
                </CardTitle>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-3xl font-bold ${
                      plan.isPremium ? "text-orange-600" : "text-gray-900"
                    }`}
                  >
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-500 text-sm">
                    /{plan.duration} month(s)
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                            plan.isPremium ? "bg-orange-500" : "bg-blue-500"
                          }`}
                        />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {editingPlan?.planTitle}</DialogTitle>
          </DialogHeader>

          {editingPlan && (
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Plan Title
                  </label>
                  <Input
                    value={editingPlan.planTitle}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, planTitle: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Price (₹)
                  </label>
                  <Input
                    type="number"
                    value={editingPlan.price}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        price: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Duration (months)
                  </label>
                  <Input
                    type="number"
                    value={editingPlan.duration}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        duration: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Description
                </label>
                <Textarea
                  value={editingPlan.description}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Features
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddFeature}
                    className="flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {editingPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Enter feature description"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageSubscriptionPlans;
