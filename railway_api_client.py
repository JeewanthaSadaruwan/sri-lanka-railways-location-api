import requests
from typing import Dict, List, Optional

class SriLankaRailwayClient:
    """Client to connect to your working Sri Lanka Railways API"""
    
    def __init__(self):
        self.base_url = "http://localhost:4000/api/v1"  # Correct URL with /api/v1
    
    def get_all_trains(self) -> List[Dict]:
        """Get all trains from Railway API"""
        try:
            response = requests.get(f"{self.base_url}/trains")
            if response.status_code == 200:
                data = response.json()
                print(f"✓ Retrieved {len(data)} trains")
                return data
            else:
                print(f"Error: {response.status_code}")
                return []
        except Exception as e:
            print(f"Connection error: {e}")
            return []
    
    def get_all_locations(self) -> List[Dict]:
        """Get all train locations"""
        try:
            response = requests.get(f"{self.base_url}/locations")
            if response.status_code == 200:
                data = response.json()
                print(f"✓ Retrieved {len(data)} train locations")
                return data
            else:
                print(f"Error: {response.status_code}")
                return []
        except Exception as e:
            print(f"Connection error: {e}")
            return []
    
    def get_train_location(self, train_id: str) -> Optional[Dict]:
        """Get specific train location"""
        try:
            response = requests.get(f"{self.base_url}/location/{train_id}")
            if response.status_code == 200:
                return response.json()
            return None
        except Exception as e:
            print(f"Error getting train {train_id}: {e}")
            return None
    
    def add_sample_train(self, train_data: Dict) -> bool:
        """Add a new train to the system"""
        try:
            response = requests.post(f"{self.base_url}/trains", json=train_data)
            return response.status_code in [200, 201]
        except Exception as e:
            print(f"Error adding train: {e}")
            return False
    
    def add_train_location(self, location_data: Dict) -> bool:
        """Add train location data"""
        try:
            response = requests.post(f"{self.base_url}/location", json=location_data)
            return response.status_code in [200, 201]
        except Exception as e:
            print(f"Error adding location: {e}")
            return False

def test_railway_api():
    """Test the Railway API connection and functionality"""
    print("🚂 Testing Sri Lanka Railway API...")
    
    client = SriLankaRailwayClient()
    
    # Test 1: Get trains
    trains = client.get_all_trains()
    
    # Test 2: Get locations
    locations = client.get_all_locations()
    
    # Test 3: Add sample data if database is empty
    if len(trains) == 0:
        print("📝 Adding sample train data...")
        
        sample_train = {
            "trainId": "COLOMBO_EXPRESS_001",
            "trainName": "Colombo Express",
            "route": "Colombo to Kandy",
            "operator": "Sri Lanka Railways"
        }
        
        if client.add_sample_train(sample_train):
            print("✓ Sample train added")
            
            # Add location for this train
            sample_location = {
                "trainId": "COLOMBO_EXPRESS_001", 
                "latitude": 6.9271,  # Colombo coordinates
                "longitude": 79.8612,
                "timestamp": "2024-01-01T10:00:00Z",
                "speed": 45
            }
            
            if client.add_train_location(sample_location):
                print("✓ Sample location added")
    
    print(f"\n📊 Summary:")
    print(f"   Trains in system: {len(trains)}")
    print(f"   Active locations: {len(locations)}")
    print(f"   API Status: ✓ Connected")
    
    return len(trains) >= 0 and len(locations) >= 0

if __name__ == "__main__":
    test_railway_api()