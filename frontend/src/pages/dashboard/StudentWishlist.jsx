import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Heart, Star, Clock, BookOpen, ShoppingCart, Trash2, GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/store/auth-context';

const wishlistItems = [
  { id: 1, title: 'JEE Advanced Chemistry - Organic', instructor: 'Dr. Vikram Rathore', category: 'Engineering', rating: 4.9, students: 234, price: '₹4,999', originalPrice: '₹7,999', duration: '12 weeks' },
  { id: 2, title: 'NEET Physics Comprehensive', instructor: 'Prof. Sunita Mehta', category: 'Medical', rating: 4.7, students: 189, price: '₹3,499', originalPrice: '₹5,999', duration: '10 weeks' },
  { id: 3, title: 'CBSE Class 12 Chemistry', instructor: 'Dr. Rajesh Kumar', category: 'Board Exams', rating: 4.8, students: 312, price: '₹2,499', originalPrice: '₹3,999', duration: '8 weeks' },
  { id: 4, title: 'GATE Data Science & AI', instructor: 'Prof. Ananya Sharma', category: 'Postgraduate', rating: 4.6, students: 98, price: '₹5,999', originalPrice: '₹8,999', duration: '16 weeks' },
];

export default function StudentWishlist() {
  const navigate = useNavigate();
  const [items, setItems] = useState(wishlistItems);

  const removeItem = (id) => { setItems(items.filter(i => i.id !== id)); toast.success('Removed from wishlist'); };

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Wishlist</h1>
        <p className="text-sm text-muted-foreground/70 mt-0.5">
          {items.length} course{items.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {items.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <Heart className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">Your wishlist is empty</h3>
          <p className="text-sm text-muted-foreground/70 mt-1 mb-4">Save courses you're interested in to enroll later</p>
          <Link to="/courses">
            <Button size="sm">Browse Courses</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4 flex gap-4">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-primary/40" />
              </div>
              <div className="flex-1 min-w-0">
                <Badge variant="secondary" size="sm">{item.category}</Badge>
                <h3 className="font-semibold text-foreground text-sm mt-1 leading-tight">{item.title}</h3>
                <p className="text-xs text-muted-foreground/70 mt-0.5">{item.instructor}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground/70 mt-2">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {item.rating}</span>
                  <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {item.students}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-base font-bold text-foreground">{item.price}</span>
                    <span className="text-xs text-muted-foreground/50 line-through ml-1.5">{item.originalPrice}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => removeItem(item.id)}>
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                    </Button>
                    <Button size="sm" className="h-8 text-xs gap-1" onClick={() => { toast.success('Enrolled successfully!'); navigate('/dashboard/student/courses'); }}>
                      <ShoppingCart className="w-3 h-3" /> Enroll
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
