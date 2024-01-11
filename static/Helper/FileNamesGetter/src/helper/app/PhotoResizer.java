//package helper.app;
//
//import net.coobird.thumbnailator.Thumbnails;
//
//import javax.imageio.IIOImage;
//import javax.imageio.ImageIO;
//import javax.imageio.ImageWriteParam;
//import javax.imageio.ImageWriter;
//import javax.imageio.stream.FileImageOutputStream;
//import javax.imageio.stream.ImageOutputStream;
//import java.awt.*;
//import java.awt.image.BufferedImage;
//import java.io.File;
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Iterator;
//import java.util.Map;
//
//public class PhotoResizer {
//    public static void photoResize(String path) throws IOException {
//        File inputFile = new File(path);
//        String extension = inputFile.getName().substring(
//                inputFile.getName().lastIndexOf(".") + 1);
//        long actualSize = inputFile.length();
//        long startSize = actualSize;
//        long targetSizeBytes = 600 * 1024;
//        System.out.println(inputFile.length() / 1024);
//
//        float compressionQuality = 1.0f;
//
//        while(actualSize > targetSizeBytes && compressionQuality > 0.9f){
//            actualSize = iterateCompressImage(inputFile, inputFile, 0.9f, actualSize);
//            compressionQuality -= 0.1f;
//
//        }
//        System.out.println(path + " compressed from " + startSize / 1024 +
//                " Kb" + " to " + actualSize / 1024 + " Kb");
//    }
//
//    private static long iterateCompressImage(File input, File output, float compressionQuality, long size) throws IOException {
//        double scaleFactor = 1d;
//        if(size / 1024 > 600) scaleFactor = 0.9d;
//        Thumbnails.of(input)
//                .scale(scaleFactor)
//                .outputQuality(compressionQuality)
//                .toFile(output);
//        return output.length();
//    }
//}
