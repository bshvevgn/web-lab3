package model;

public class AreaResultChecker {
    private static boolean checkInCircle(final double x, final double y, final double r){
        return x > 0 && y > 0 && Math.sqrt(x * x + y * y) <= r;
    }

    private static boolean checkArea(final double x, final double y, final double r) {
        boolean inCircle = checkInCircle(x, y, r);
        boolean inTriangle = (x >= 0 && y <= 0 && Math.abs(x) + Math.abs(y) <= r/2);
        boolean inArea = (x <= 0 && x >= -r && y <= 0 && y >= -r/2);
        return inCircle || inTriangle || inArea;
    }

    private static boolean validateXYR(double x, double y, double r) {
        return x >= -3 && x <= 3 && y >= -5 && y <= 3 && r >= 1 && r <= 4;
    }
    public static boolean getResult(double x, double y, double r) {
        return checkArea(x, y, r) && validateXYR(x, y, r);
    }
}