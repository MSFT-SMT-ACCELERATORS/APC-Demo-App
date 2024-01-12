namespace APC.DataModel
{
    public class LocationArea
    {
        public string AreaType { get; set; }
        public Circle Circle { get; set; }
    }

    public class Circle
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Radius { get; set; }
    }
}
