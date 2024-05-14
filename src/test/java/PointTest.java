import model.CheckAreaBean;
import model.Point;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

class PointTest {

    @ParameterizedTest
    @MethodSource("hitPointsFactory")
    void testCheckHit(Point point) {
        assertTrue(point.calculateResult());
    }

    @ParameterizedTest
    @MethodSource("missPointsFactory")
    void testCheckMiss(Point point) {
        assertFalse(point.calculateResult());
    }

    static Stream<Point> hitPointsFactory() {
        return Stream.of(
                new Point(1,1,4),
                new Point(1,-0.5,2)
        );
    }

    static Stream<Point> missPointsFactory() {
        return Stream.of(
                new Point(3,3,1),
                new Point(-1, -1, 3)
        );
    }

}