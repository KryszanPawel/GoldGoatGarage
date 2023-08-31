package helper.app;

import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.FileImageOutputStream;
import javax.imageio.stream.ImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class PhotoResizer {
    public static void photoResize(String path) throws IOException {
        File inputFile = new File(path);


        BufferedImage originalImage = ImageIO.read(inputFile);
        String extension = inputFile.getName().substring(
                inputFile.getName().lastIndexOf(".") + 1);

        long startingSize = (inputFile.length() / 1024);

        File outputFile = new File(path);
        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpg");
        ImageWriter writer = writers.next();

        ImageWriteParam param = writer.getDefaultWriteParam();
        param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        ImageOutputStream output = ImageIO.createImageOutputStream(outputFile);

        float compressionQuality = 0.95f;
        while(inputFile.length() / 1024 > 1000){
            outputFile = new File(path);

            param.setCompressionQuality(compressionQuality);

            output = ImageIO.createImageOutputStream(outputFile);
            writer.setOutput(output);
            writer.write(null, new javax.imageio.IIOImage(originalImage, null,null), param);
            inputFile = outputFile;
            System.out.println(path);
        }


        output.close();
        writer.dispose();

        outputFile = new File("./output_compressed." + extension);

        System.out.println(inputFile + "    " + startingSize / 1024 + " KB to " + outputFile.length() / 1024 + " KB");


    }
}
